import { useState }       from 'react'
import { useForm }        from '@mantine/form'
import { is_btc_address } from '@scrow/sdk/util'
import { useConfig }      from '@/hooks/useConfig'
import { useClient }      from '@/hooks/useClient'

import { AccountData, ContractData, DepositData, EscrowSigner, Network } from '@scrow/sdk'

import { Box, Button, NumberInput, Slider, Text, TextInput } from '@mantine/core'
import { useFeeRates } from '@scrow/hooks'

import PaymentView from './payment'

interface Props {
  contract : ContractData
  signer   : EscrowSigner
}

export default function ({ contract, signer } : Props) {
  const { created_at, fund_pend, fund_txfee, fund_value, status, tx_total } = contract

  const [ account, setAccount ] = useState<AccountData | null>(null)
  const [ deposit, setDeposit ] = useState<DepositData | null>(null)
  const [ slider, setSlider   ] = useState(1)

  const { client } = useClient()
  const config     = useConfig()

  const { data : feerates } = useFeeRates(client)

  const can_deposit = (status === 'published' && (fund_pend + fund_value) < tx_total)

  const form = useForm({
    initialValues : {
      address  : signer.address.new(created_at),
      feerate  : 1,
      locktime : 60 * 60 * 48,
      value    : (tx_total - (fund_value + fund_pend)) + fund_txfee
    },
    validate : {
      address : validate_address(config.store.network as Network)
    }
  })

  const req_account = async () => {
    form.validate()
    if (form.isValid()) {
      const { address, locktime } = form.getValues()
      const req = signer.account.create(address, locktime)
      const res = await client.deposit.request(req)
      if (res.ok) {
        setAccount(res.data.account)
      }
    }
  }

  const update_fee = (e : number) => {
    if (feerates !== undefined) {
      const count = (e < 20) ? 1 : Math.floor(e / 10)
      form.setFieldValue('feerate', feerates[count])
    }
  }

  return (
    <>
      { can_deposit && account === null &&
        <Box>
        <Text mt={20}>Request a time-locked deposit account from the Provider:</Text>
          <NumberInput
            description="The amount (in sats) you wish to deposit into escrow."
            suffix=' sats'
            {...form.getInputProps('value')}
          />
          <NumberInput
            description="The length of time (in seconds) your deposit will be locked in escrow."
            suffix=' seconds'
            {...form.getInputProps('locktime')}
          />
          <TextInput
            description="The return address to use for closing or recovering your deposit."
            {...form.getInputProps('address')}
          />
          <Slider
            m={10}
            p={20}
            value={slider}
            onChange={setSlider}
            onChangeEnd={(e) => update_fee(e)}
            marks={[
              { value: 1,   label : 'Next Block' },
              { value: 30,  label : '3 Blocks'   },
              { value: 60,  label : '6 Blocks'   },
              { value: 100, label : '10 Blocks'  }
            ]}
          />
          <NumberInput
            mt={25}
            min={1}
            max={1000}
            suffix=" sats per vbyte"
            {...form.getInputProps('feerate')}
          />
          <Button mt={10} onClick={req_account}>Reserve Account</Button>
        </Box>
      }
      { can_deposit && account !== null &&
        <Box>
          <PaymentView 
            account={account}
            contract={contract}
            form={form}
            setDeposit={setDeposit}
            signer={signer}
          />
          <Button mt={10} onClick={() => setAccount(null)}>Cancel Account</Button>
        </Box>
      }
    </>
  )
}

function validate_address (
  network : Network
) {
  return (address : string) => {
    return is_btc_address(address, network)
  }
}
