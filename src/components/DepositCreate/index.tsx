import { useSigner }        from '@/hooks/useSigner'
import { Box, Tabs, Text }  from '@mantine/core'
import { useSearchParams }  from 'react-router-dom'
import { validate_address } from '@/lib/draft'
import { useConfig }        from '@/hooks/useConfig'
import { is_hash }          from '@scrow/sdk/util'

import { UseFormReturnType, useForm } from '@mantine/form'

import { Dispatch, SetStateAction, useState } from 'react'

import { AccountData, ContractData, DepositData, Network, OracleTxSpendData } from '@scrow/sdk'

import PageHeader   from './components/header'
import RequestForm  from './components/request'
import DepositForm  from './components/deposit'
import RegisterView from './components/register'
import SuccessView  from './components/success'
import Stepper from './components/stepper'

export type DepositForm = UseFormReturnType<{
  cid      : string
  address  : string
  duration : number
  feerate  : number
}>

export type DepositDispatch = Dispatch<SetStateAction<DepositState>>

export interface DepositState {
  account   : AccountData       | null
  contract  : ContractData      | null
  deposit   : DepositData       | null
  fundable  : boolean
  payment   : OracleTxSpendData | null
  remaining : number            | null
}

export default function () {
  const config     = useConfig()
  const { signer } = useSigner()
  const [ params ] = useSearchParams()

  const [ state, setState ] = useState<DepositState>({
    account   : null,
    contract  : null,
    deposit   : null,
    fundable  : false,
    payment   : null,
    remaining : null
  })

  const form = useForm({
    initialValues : {
      cid      : params.get('cid')  ?? '',
      address  : params.get('addr') ?? '',
      duration : Number(params.get('dur')  ?? 172800),
      feerate  : Number(params.get('fr')   ?? 1)
    },
    validateInputOnChange : true,
    validate : {
      address : validate_address(config.store.network as Network),
      cid     : (cid : string) => {
        if (cid === '') {
          return null
        } else if (!is_hash(cid)) {
          return 'invalid contract id'
        } else {
          return null
        }
      }
    }
  })

  const step = get_progress(state)

  return (
    <Box p={20}>
      <PageHeader />
      { signer === null &&
        <>
          <Text c='dimmed' mb={5}>You are not logged in</Text>
          <Text c='dimmed'>Please login to your signing device to continue.</Text>
        </>
      }
      { signer !== null &&
        <Box>
           <Stepper step={step}/>
          <Tabs value={step.toString()}>
            <Tabs.Panel value="0">
              <RequestForm
                form     = {form}
                state    = {state}
                setState = {setState}
                signer   = {signer}
              />
            </Tabs.Panel>
            <Tabs.Panel value="1">
              { state.account !== null && 
                <DepositForm
                  account   = {state.account}
                  cid       = {state.contract?.cid ?? 'null'}
                  remaining = {state.remaining}
                  setState  = {setState}
                />
              }
            </Tabs.Panel>
            <Tabs.Panel value="2">
              { state.payment !== null &&
                <RegisterView
                  form     = {form}
                  state    = {state}
                  setState = {setState}
                  signer   = {signer}
                />
              }
            </Tabs.Panel>
            <Tabs.Panel value="3">
              { state.deposit !== null &&
                <SuccessView 
                  contract = {state.contract}
                  deposit  = {state.deposit}
                />
              }
            </Tabs.Panel>
          </Tabs>
        </Box>
      }
    </Box>
  )
}

function get_progress (state : DepositState) {
  if (state.deposit) {
    return 3
  } else if (state.payment && !state.deposit) {
    return 2
  } else if (state.account && !state.payment) {
    return 1
  } else {
    return 0
  }
}
