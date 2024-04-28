import { AccountData }    from '@scrow/sdk'
import { useClient }      from '@/hooks/useClient'
import { usePayAddress }  from '@scrow/hooks'
import { truncate_id }    from '@/lib/draft'
import QRCode             from 'react-qr-code'
import CopyBtn            from '@/components/ui/copyBtn'

import { useEffect, useState } from 'react'

import { Box, Code, Group, Loader, LoadingOverlay, NumberInput, Stack, Text } from '@mantine/core'

import { DepositDispatch } from '..'

interface Props {
  account   : AccountData
  cid       : string
  remaining : number | null
  setState  : DepositDispatch
}

export default function ({ account, cid, remaining, setState } : Props) {

  const address             = account.deposit_addr
  const { client }          = useClient()
  const { data, isLoading } = usePayAddress(client, address)
  const [ value, setValue ] = useState(remaining ?? 10000)

  const has_utxo = data !== undefined && data.length === 1

  useEffect(() => {
    if (has_utxo) {
      setState((e) => {
        return { ...e, payment : data [0] }
      })
    }
  }, [ data ])

  return (
    <Stack align='center' >

      <Box>
        <Group>
          <Text w={150} ff='monospace' ta='right' size='sm'>Deposit Address</Text>
          <Text>:</Text>
          <Code>{truncate_id(address)}</Code>
        </Group>
        <Group>
          <Text w={150} ff='monospace' ta='right' size='sm'>Contract Id</Text>
          <Text>:</Text>
          <Code>{truncate_id(cid)}</Code>
        </Group>
      </Box>

      <Group justify='center'>
        <Text>Checking for deposits</Text>
        <Loader color="blue" type="dots" />
      </Group>

      <Box>
        <LoadingOverlay visible={isLoading} loaderProps={{ children : <Loader /> }} />
        <QRCode value={`bitcoin:${address}?amount=${value / 100_000_000}`}/>
      </Box>

      <NumberInput
        description="Customize the request amount (in sats)."
        suffix=' sats'
        value={value}
        onChange={(e) => setValue(Number(e))}
      />

      <CopyBtn data={address} label='Copy Address'/>

    </Stack>
  )
}
