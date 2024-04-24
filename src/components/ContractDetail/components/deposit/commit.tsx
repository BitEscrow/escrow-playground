import { validate_address } from '@/lib/draft'
import { useConfig }        from '@/hooks/useConfig'
import { useState }         from 'react'
import { Box }              from '@mantine/core'

import { UseFormReturnType, useForm } from '@mantine/form'

import {
  AccountData,
  ContractData,
  DepositData,
  EscrowSigner, 
  Network
} from '@scrow/sdk'

import AccountForm from './account'
import DepositInfo from './info'
import PaymentForm from './payment'

interface Props {
  contract : ContractData
  signer   : EscrowSigner
}

export type DepositForm = UseFormReturnType<{
  address  : string
  feerate  : number
  locktime : number
}>

export default function ({ contract, signer } : Props) {
  const [ account, setAccount ] = useState<AccountData | null>(null)
  const [ deposit, setDeposit ] = useState<DepositData | null>(null)

  const config = useConfig()

  const form = useForm({
    initialValues : {
      address  : '',
      feerate  : 1,
      locktime : contract.terms.duration + (60 * 60 * 48),
    },
    validate : {
      address : validate_address(config.store.network as Network)
    }
  })

  return (
    <Box>
      { account === null && deposit === null &&
        <AccountForm form={form} setAccount={setAccount} signer={signer} />
      }
      { account !== null && deposit === null &&
        <PaymentForm
          account    = {account}
          contract   = {contract}
          form       = {form}
          setDeposit = {setDeposit}
          signer     = {signer}
        />
      }
      { account !== null && deposit !== null &&
        <DepositInfo deposit={deposit} />
      }
    </Box>
  )
}