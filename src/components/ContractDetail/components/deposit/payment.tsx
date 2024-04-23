import { UseFormReturnType } from '@mantine/form'
import { Box, Loader, LoadingOverlay, Text } from '@mantine/core'
import QRCode  from 'react-qr-code'

import { useClient, usePayAddress } from '@scrow/hooks'

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

type FormData = UseFormReturnType<{
  address  : string
  feerate  : number
  locktime : number
  value    : number
}>

interface Props {
  account    : AccountData
  contract   : ContractData
  form       : FormData
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
    <Box>
      <LoadingOverlay visible={isLoading} loaderProps={{ children : <Loader /> }} />
      <Text>Deposit Address: {account.deposit_addr}</Text>
      <Text>Deposit Amount: {value}</Text>
      <QRCode value={addr_uri}/>
      { has_utxo && <Text>{JSON.stringify(data, null, 2)}</Text> }
    </Box>
  )
}
