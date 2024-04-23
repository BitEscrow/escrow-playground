import { useClient }         from '@/hooks/useClient'
import { usePayAddress }     from '@scrow/hooks'
import { DepositForm }       from './commit'
import QRCode                from 'react-qr-code'

import { Box, Card, Code, Group, Loader, LoadingOverlay, Text, Title } from '@mantine/core'

import {
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'

import {
  AccountData,
  ContractData,
  DepositData,
  EscrowSigner
} from '@scrow/sdk'
import CopyBtn from '@/components/ui/copyBtn'
import { truncate_id } from '@/lib/draft'

interface Props {
  account    : AccountData
  contract   : ContractData
  form       : DepositForm
  setDeposit : Dispatch<SetStateAction<DepositData | null>>
  signer     : EscrowSigner
}

export default function ({ account, contract, form, setDeposit, signer } : Props) {
  const { client } = useClient()

  const { data, isLoading } = usePayAddress(client, account.deposit_addr)

  const has_utxo = data !== undefined && data.length === 1

  const { feerate, value } = form.getValues()

  const addr_uri = `bitcoin:${account.deposit_addr}?amount=${value / 100_000_000}`

  useEffect(() => {
    if (has_utxo) {
      const utxo = data[0].txout
      const req  = signer.deposit.commit(account, contract, feerate, utxo)
      client.contract.commit(req).then(res => {
        if (!res.ok) throw new Error(res.error)
        void setDeposit(res.data.deposit)
      })
    }
  }, [ data ])

  return (
    <Card withBorder maw={300}>
      <Title ta='center' mb={15} order={3}>Send a Deposit</Title>
      <Box mb={15}>
        <LoadingOverlay visible={isLoading} loaderProps={{ children : <Loader /> }} />
        <QRCode value={addr_uri}/>
      </Box>
      
      <Group>
        <Text w={50} ff='monospace' size='sm'>Address</Text>
        <Text>:</Text>
        <Code>{truncate_id(account.deposit_addr)}</Code>
      </Group>

      <Group mb={15}>
        <Text w={50} ff='monospace' size='sm'>Amount</Text>
        <Text>:</Text>
        <Code>{value}</Code>
      </Group>

      <CopyBtn data={account.deposit_addr} label='Copy Address'/>

      <Group mt={15}>
        { !has_utxo && <Text>checking for deposits</Text>}
        { has_utxo &&  <Text>registering deposit</Text>}
        <Loader color="blue" type="dots" />
      </Group>

    </Card>
  )
}
