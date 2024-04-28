// Progress bar for tx confirmation.

import { useClient }    from '@/hooks/useClient'
import { truncate_id }  from '@/lib/draft'
import { useClipboard } from '@mantine/hooks'

import { IconCopy, IconExternalLink }      from '@tabler/icons-react'
import { ContractData, TxSpentState }      from '@scrow/sdk'
import { Button, Code, Flex, Group, Text } from '@mantine/core'

interface Props {
  data : ContractData & TxSpentState
}

export default function ({ data } : Props) {
  const { client } = useClient()
  const clip  = useClipboard()
  const txid  = data.spent_txid
  const link  = `${client.oracle_url}/tx/${txid}`
  const color = clip.copied ? 'green' : 'blue'

  const open_link = () => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Flex justify='center'>
      <Group gap='xs' h={24} align='center'>
        <Text fw={700}>Final Transaction</Text>
        <Text>:</Text>
        <Code>{truncate_id(txid)}</Code>
        <Button h={24} w={24} p={0} onClick={() => clip.copy(txid)} bg={color}>
          <IconCopy size={16} />
        </Button>
        <Button h={24} w={24} p={0} onClick={open_link}>
          <IconExternalLink size={18} />
        </Button>
      </Group>
    </Flex>
  )
}