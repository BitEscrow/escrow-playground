import { now }            from '@scrow/sdk/util'
import { EscrowSigner }   from '@scrow/sdk'
import { useFeeRates }    from '@scrow/hooks'
import { useClient }      from '@/hooks/useClient'
import { useErrResToast } from '@/hooks/useToast'
import { useState }       from 'react'
import { useNavigate }    from 'react-router-dom'

import { Button, NumberInput, Slider, Stack } from '@mantine/core'

import { DepositDispatch, DepositForm, DepositState } from '..'

import ContractForm from './contract'
import AddressInput from '@/components/ui/AddressInput'

interface Props {
  form     : DepositForm
  state    : DepositState
  setState : DepositDispatch
  signer   : EscrowSigner
}

export default function ({ form, state, setState, signer } : Props) {
  const [ slider, setSlider ] = useState(1)

  const { client } = useClient()

  const { data : feerates } = useFeeRates(client)

  const navigate    = useNavigate()
  const can_deposit = (state.contract === null || state.fundable)

  const req_account = async () => {
    form.validate()
    if (form.isValid()) {
      const { address, duration } = form.getValues()
      const req = signer.account.request(duration, address)
      const res = await client.account.request(req)
      if (res.ok) {
        setState((e) => {
          return { ...e, account : res.data.account }
        })
        const { pathname } = window.location
        const { address, cid, duration, feerate } = form.getValues()
        navigate(`${pathname}?addr=${address}&cid=${cid}&dur=${duration}&fr=${feerate}`)
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
    <Stack>
      <NumberInput
        description="The duration of time (in seconds) to lock your deposit into escrow."
        suffix=' seconds'
        {...form.getInputProps('duration')}
      />
      <AddressInput
        account={now()}
        onGenerate={(e) => form.setFieldValue('address', e)}
        description="The return address to use for closing or recovering your deposit."
        placeholder="paste an address here, or click generate"
        {...form.getInputProps('address')}
      />
      <NumberInput
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

      <ContractForm form={form} state={state} setState={setState} signer={signer} />

      <Button disabled={!can_deposit} onClick={req_account}>Reserve Account</Button>
    </Stack>
  )
}
