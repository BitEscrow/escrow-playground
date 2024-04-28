import { useEffect }     from 'react'
import { EscrowSigner }  from '@scrow/sdk'
import { is_hash }       from '@scrow/sdk/util'
import { useContract }   from '@scrow/hooks'
import { useClient }     from '@/hooks/useClient'
import { Loader, Stack } from '@mantine/core'

import { DepositDispatch, DepositForm, DepositState } from '..'

import CIDField from './cid'
import FundView from './funds'

interface Props {
  form     : DepositForm
  state    : DepositState
  setState : DepositDispatch
  signer   : EscrowSigner
}

export default function ({ form, state, setState, signer  } : Props) {
  const { client } = useClient()

  const cid = (is_hash(form.values.cid))
    ? form.values.cid
    : null

  const { data, isLoading } = useContract(client, cid)

  const contract = (cid !== null) ? data ?? null : null

  useEffect(() => {
    if (contract !== state.contract) {
      if (contract === null) {
        setState((e) => {
          return { ...e, contract : null, fundable : false, remaining : null }
        })
      } else {
        setState((e) => {
          const { canceled, activated, fund_pend, fund_value, tx_total } = contract
          const remaining = tx_total - (fund_pend + fund_value)
          const fundable  = !canceled && !activated && remaining > 0
          console.log('fundable:', fundable)
          if (!fundable) {
            form.setErrors({ cid : 'Contract is not in a fundable state.' })
          }
          return { ...e, contract, fundable, remaining }
        })
      }
    }
  }, [ cid, data ])
  
  return (
    <Stack>
      <CIDField form={form} signer={signer} />
      { !data && isLoading && <Loader /> }
      { data && <FundView contract={data} state={state} setState={setState} />}
    </Stack>
  )
}
