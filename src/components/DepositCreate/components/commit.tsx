import { useConfig }   from '@/hooks/useConfig'
import { useState }    from 'react'
import { useNavigate } from 'react-router-dom'
import LineItem        from '@/components/ui/LineItem'

import { truncate_id, validate_address }  from '@/lib/draft'
import { Box, Button, Card, Group, Text } from '@mantine/core'
import { UseFormReturnType, useForm }     from '@mantine/form'

import {
  AccountData,
  ContractData,
  CoreSchema,
  DepositData,
  EscrowSigner, 
  FundingData, 
  Network
} from '@scrow/sdk'

import AccountForm from './account'
import PaymentForm from './payment'

interface Props {
  contract : ContractData
  signer   : EscrowSigner
  update   : (funds : FundingData[]) => void
}

export type DepositForm = UseFormReturnType<{
  address  : string
  feerate  : number
  locktime : number
}>

export default function ({ contract, signer, update } : Props) {
  const [ account, setAccount ] = useState<AccountData | null>(null)
  const [ deposit, setDeposit ] = useState<DepositData | null>(null)

  const config   = useConfig()
  const navigate = useNavigate()

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

  const add_deposit = (deposit : DepositData) => {
    setDeposit(deposit)
    const parser = CoreSchema.deposit.fund
    const fund   = parser.parse(deposit)
    update([ fund ])
  }

  const view_deposit = () => {
    if (deposit !== null) {
      navigate(`/deposits/${deposit.dpid}`)
    }
  }

  const clear_deposit = () => {
    setAccount(null)
    setDeposit(null)
  }

  return (
    <Box>
      { account === null && deposit === null &&
        <AccountForm contract={contract} form={form} setAccount={setAccount} signer={signer} />
      }
      { account !== null && deposit === null &&
        <PaymentForm
          account    = {account}
          addDeposit = {add_deposit}
          contract   = {contract}
          form       = {form}
          signer     = {signer}
        />
      }
      { account !== null && deposit !== null &&
        <Card withBorder>
          <Text>Your deposit has been registered!</Text>
          <LineItem label="DPID"  value={truncate_id(deposit.dpid)} />
          <LineItem label="TXID"  value={deposit.utxo.txid} />
          <LineItem label="Value" value={String(deposit.utxo.value)} />
          <Group>
            <Button onClick={view_deposit}>View Deposit</Button>
            <Button onClick={clear_deposit}>New Deposit</Button>
          </Group>
        </Card>
      }
    </Box>
  )
}