import { AccountData }    from '@scrow/sdk'
import { useClient }      from '@/hooks/useClient'
import { usePayAddress }  from '@scrow/hooks'
import { truncate_id }    from '@/lib/draft'
import QRCode             from 'react-qr-code'
import CopyBtn            from '@/components/ui/copyBtn'
import { useConfig }      from '@/hooks/useConfig'

import { useEffect, useState }           from 'react'
import { DepositDispatch, DepositState } from '..'
import { IconCurrencyBitcoin }           from '@tabler/icons-react'

import { Anchor, Box, Code, Group, Loader, LoadingOverlay, Notification, NumberInput, Stack, Text } from '@mantine/core'

interface Props {
  account   : AccountData
  state     : DepositState
  setState  : DepositDispatch
}

export default function ({ account, state, setState } : Props) {

  const config  = useConfig()

  const address = account.deposit_addr

  const cid     = (state.contract !== null)
    ? truncate_id(state.contract.cid)
    : 'null'

  const initval = (state.contract !== null && state.remaining !== null)
    ? state.remaining + state.contract.fund_txfee
    : 10000

  const { client }          = useClient()
  const { data, isLoading } = usePayAddress(client, address, { refreshInterval : 5000 })
  const [ value, setValue ] = useState(initval)

  const has_utxo = data !== undefined && data.length > 0

  useEffect(() => {
    if (has_utxo) {
      setState((e) => { return { ...e, payment : data[0] } })
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
          <Code>{cid}</Code>
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

      { config.store.network === 'mutiny' &&
      
          <Notification
            mt={20}
            icon={<IconCurrencyBitcoin />}
            withCloseButton={false}
          >
            <Text>You can get free coins from this faucet:</Text>
            <Anchor href='https://faucet.mutinynet.com' target="_blank">
              https://faucet.mutinynet.com
            </Anchor>
          </Notification>
      }

    </Stack>
  )
}
