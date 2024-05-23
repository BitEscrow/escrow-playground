// Progress bar for tx confirmation.

import { useClient }    from '@/hooks/useClient'
import { truncate_id }  from '@/lib/draft'
import { useClipboard } from '@mantine/hooks'

import { IconCopy, IconExternalLink } from '@tabler/icons-react'

import { Button, Code, Group, Stack, Text } from '@mantine/core'

import { ContractData, TxIsSpent } from '@scrow/sdk'

interface Props {
  data : ContractData &TxIsSpent
}

export default function ({ data } : Props) {
  const { client } = useClient()
  const clip   = useClipboard()
  const txid   = data.spent_txid
  const vmlink = `${client.server_url}/api/machine/${data.machine_vmid}`
  const txlink = `${client.oracle._host}/tx/${txid}`
  const color  = clip.copied ? 'green' : 'blue'

  const open_link = (link : string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Stack align='center'>
      <Stack>
        <Group gap='xs'>
          <Text w={85} fw={700} size='sm' ta='right'>Closed Hash</Text>
          <Text>:</Text>
          <Group>
            <Code>{truncate_id(data.machine_head ?? 'null')}</Code>
            <Button h={24} w={24} p={0} onClick={() => clip.copy(data.machine_head)} bg={color}>
              <IconCopy size={16} />
            </Button>
            <Button h={24} w={24} p={0} onClick={() => open_link(vmlink)}>
              <IconExternalLink size={18} />
            </Button>
          </Group>
        </Group>
        <Group gap='xs'>
          <Text w={85} fw={700} size='sm' ta='right'>Final Tx</Text>
          <Text>:</Text>
          <Group>
            <Code>{truncate_id(txid)}</Code>
            <Button h={24} w={24} p={0} onClick={() => clip.copy(txid)} bg={color}>
              <IconCopy size={16} />
            </Button>
            <Button h={24} w={24} p={0} onClick={() => open_link(txlink)}>
              <IconExternalLink size={18} />
            </Button>
          </Group>
        </Group>
      </Stack>
    </Stack>
  )
}