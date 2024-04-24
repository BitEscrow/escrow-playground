import { useClient }     from '@/hooks/useClient'
import { usePayAddress } from '@scrow/hooks'
import { DepositForm }   from './commit'
import { truncate_id }   from '@/lib/draft'
import QRCode            from 'react-qr-code'

import { Box, Card, Code, Group, Loader, LoadingOverlay, NumberInput, Text } from '@mantine/core'

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import {
  AccountData,
  ContractData,
  DepositData,
  EscrowSigner
} from '@scrow/sdk'

import CopyBtn from '@/components/ui/copyBtn'

interface Props {
  account    : AccountData
  contract   : ContractData
  form       : DepositForm
  setDeposit : Dispatch<SetStateAction<DepositData | null>>
  signer     : EscrowSigner
}

export default function ({ account, contract, form, setDeposit, signer } : Props) {
  const { fund_pend, fund_txfee, fund_value, tx_total } = contract

  const { client }          = useClient()
  const { feerate }         = form.getValues()
  const { data, isLoading } = usePayAddress(client, account.deposit_addr)

  const [ value, setValue ] = useState((tx_total - (fund_value + fund_pend)) + fund_txfee)

  const has_utxo = data !== undefined && data.length === 1

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
      <Group mb={15} justify='center'>
        { !has_utxo && <Text>Checking for deposits</Text>}
        { has_utxo &&  <Text>Registering your deposit</Text>}
        <Loader color="blue" type="dots" />
      </Group>

      <Box mb={15}>
        <LoadingOverlay visible={isLoading} loaderProps={{ children : <Loader /> }} />
        <QRCode value={`bitcoin:${account.deposit_addr}?amount=${value / 100_000_000}`}/>
        <NumberInput
          mb={15}
          description="Customize the request amount (in sats)."
          suffix=' sats'
          value={value}
          onChange={(e) => setValue(Number(e))}
        />
      </Box>
      
      <Group mb={10}>
        <Text w={50} ff='monospace' size='sm'>Address</Text>
        <Text>:</Text>
        <Code>{truncate_id(account.deposit_addr)}</Code>
      </Group>

      <CopyBtn data={account.deposit_addr} label='Copy Address'/>

    </Card>
  )
}
