// Progress bar for tx confirmation.

import { useClient }    from '@/hooks/useClient'
import { truncate_id }  from '@/lib/draft'
import { useClipboard } from '@mantine/hooks'

import { IconCopy, IconExternalLink } from '@tabler/icons-react'

import { Button, Code, Group, Stack, Text } from '@mantine/core'

import { ContractData, TxSpentState } from '@scrow/sdk'

interface Props {
  data : ContractData & TxSpentState
}

export default function ({ data } : Props) {
  const { client } = useClient()
  const clip   = useClipboard()
  const txid   = data.spent_txid
  const vmlink = `${client.server_url}/api/vm/${data.vmid}`
  const txlink = `${client.oracle_url}/tx/${txid}`
  const color  = clip.copied ? 'green' : 'blue'

  const open_link = (link : string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Stack align='center'>
      <Stack>
        <Group gap='xs' h={24}>
          <Text w={150} fw={700} ta='right'>Closing Hash</Text>
          <Text>:</Text>
          <Code>{truncate_id(data.active_head ?? 'null')}</Code>
          <Button h={24} w={24} p={0} onClick={() => clip.copy(data.active_head)} bg={color}>
            <IconCopy size={16} />
          </Button>
          <Button h={24} w={24} p={0} onClick={() => open_link(vmlink)}>
            <IconExternalLink size={18} />
          </Button>
        </Group>
        <Group gap='xs' h={24}>
          <Text w={150} fw={700} ta='right'>Final Transaction</Text>
          <Text>:</Text>
          <Code>{truncate_id(txid)}</Code>
          <Button h={24} w={24} p={0} onClick={() => clip.copy(txid)} bg={color}>
            <IconCopy size={16} />
          </Button>
          <Button h={24} w={24} p={0} onClick={() => open_link(txlink)}>
            <IconExternalLink size={18} />
          </Button>
        </Group>
      </Stack>
    </Stack>
  )
}