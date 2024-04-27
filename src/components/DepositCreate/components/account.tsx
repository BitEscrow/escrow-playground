import { Buff }           from '@cmdcode/buff'
import { useFeeRates }    from '@scrow/hooks'
import { useClient }      from '@/hooks/useClient'
import { DepositForm }    from './commit'
import { IconRotate }     from '@tabler/icons-react'
import { useErrResToast } from '@/hooks/useToast'

import { Dispatch, SetStateAction, useState }               from 'react'
import { AccountData, ContractData, EscrowSigner }          from '@scrow/sdk'
import { Button, Fieldset, NumberInput, Slider, TextInput } from '@mantine/core'

interface Props {
  contract   : ContractData
  form       : DepositForm
  setAccount : Dispatch<SetStateAction<AccountData | null>>
  signer     : EscrowSigner
}

export default function ({ contract, form, setAccount, signer } : Props) {
  const [ slider, setSlider   ] = useState(1)

  const { client } = useClient()

  const { data : feerates } = useFeeRates(client)

  const gen_address = () => {
    const hash = Buff.json([ contract.cid, contract.fund_count ]).digest
    const addr = signer.address.new(hash.slice(0, 4).num)
    form.setFieldValue('address', addr)
  }

  const req_account = async () => {
    form.validate()
    if (form.isValid()) {
      const { address, locktime } = form.getValues()
      const req = signer.account.create(address, locktime)
      const res = await client.deposit.request(req)
      if (res.ok) {
        setAccount(res.data.account)
      } else {
        useErrResToast(res)
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
    <Fieldset legend="Make a Deposit">
      <NumberInput
        mb={15}
        description="The duration of time (in seconds) to lock your deposit into escrow."
        suffix=' seconds'
        {...form.getInputProps('locktime')}
      />
      <TextInput
        mb={15}
        description="The return address to use for closing or recovering your deposit."
        rightSection={
          <Button onClick={gen_address}><IconRotate size={24} /></Button>
        }
        rightSectionWidth={60}
        {...form.getInputProps('address')}
      />
      <NumberInput
        mb={15}
        min={1}
        max={1000}
        description="The feerate that will be used for your return transaction."
        suffix=" sats per vbyte"
        {...form.getInputProps('feerate')}
      />
      <Slider
        mx={10}
        mb={30}
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

      <Button onClick={req_account}>Reserve Account</Button>
    </Fieldset>
  )
}
