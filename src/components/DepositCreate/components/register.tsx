import { assert }         from '@scrow/sdk/util'
import { EscrowSigner }   from '@scrow/sdk'
import { useEffect }      from 'react'
import { useClient }      from '@/hooks/useClient'
import { useErrResToast } from '@/hooks/useToast'

import { Box } from '@mantine/core'

import { DepositDispatch, DepositForm, DepositState } from '..'

interface Props {
  form     : DepositForm
  state    : DepositState
  setState : DepositDispatch
  signer   : EscrowSigner
}

export default function ({ form, state, setState, signer } : Props) {
  assert.exists(state.payment)
  const { client }  = useClient()
  const { feerate } = form.getValues()
  const utxo        = state.payment.txout

  useEffect(() => { register() }, [ state.payment ])

  const register = async () => {
    assert.exists(state.account)
    if (state.contract !== null) {
      const req = signer.deposit.commit(state.account, state.contract, feerate, utxo)
      const res = await client.contract.commit(req)
      if (res.ok) {
        setState(e => { return { ...e, ...res.data } })
      } else {
        useErrResToast(res)
      }
    } else {
      const req = signer.deposit.register(state.account, feerate, utxo)
      const res = await client.deposit.register(req)
      if (res.ok) {
        setState(e => { return { ...e, ...res.data } })
      } else {
        useErrResToast(res)
      }
    }
  }

  return (
    <Box>
      
    </Box>
  )
}