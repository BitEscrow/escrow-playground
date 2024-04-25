import { ContractData } from '@scrow/sdk/core'
import { useClipboard } from '@mantine/hooks'
import { IconCopy }     from '@tabler/icons-react'
import { truncate_id }  from '@/lib/draft'

import { Dispatch, SetStateAction } from 'react'
import { Anchor, Badge, Box, Button, Code, Group, Text, Title } from '@mantine/core'

import Controls from './controls'

interface Props {
  data    : ContractData
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ data, setView } : Props) {

  const clip  = useClipboard({ timeout: 500 })

  const color = () => {
    switch (data?.status) {
      case 'published': return '#0068FD'
      case 'funded' :   return '#0068FD'
      case 'secured':   return '#0068FD'
      case 'active':    return '#0068FD'
      case 'settled':   return '#3F8C4F'
      case 'spent':     return '#0068FD'
      case 'canceled':  return 'red'
      case 'expired':   return 'red'
      case 'error':     return 'red'
      default:          return 'grey'
    }
  }

  const cid   = truncate_id(data.cid)
  const title = data.terms.title

  return (
    <Box>
      <Group style={{ justifyContent : 'space-between', alignItems: 'flex-start' }}>
        <Anchor mb={20} maw="70%" href={window.location.href} c='dark'>
          <Title order={3} lineClamp={2}>{title}</Title>
        </Anchor>
        <Controls setView={setView} />
      </Group>
      <Group mb={10}>
        <Text w={60}>CID</Text>
        <Text>:</Text>
        <Code>{cid}</Code>
        <Button h={20} w={20} p={2}
          color={clip.copied ? 'teal' : 'blue'}
          onClick={() => clip.copy(data.cid)}
        >
          <IconCopy size={12}/>
        </Button>
      </Group>
      <Group mb={10}>
        <Text w={60}>Status</Text>
        <Text>:</Text>
        <Badge
          mb={2}
          radius={15}
          color={color()}
        >
          {data.status}
        </Badge>
      </Group>
      <Group mb={10}>
        <Text w={60}>Updated</Text>
        <Text>:</Text>
        <Code>{new Date(data.updated_at * 1000).toLocaleString()}</Code>
      </Group>
    </Box>
  )
}
