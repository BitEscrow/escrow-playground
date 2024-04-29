import { Dispatch, SetStateAction } from 'react'
import { DepositData }              from '@scrow/sdk/core'
import { useClipboard }             from '@mantine/hooks'
import { IconCopy }                 from '@tabler/icons-react'
import { truncate_id }              from '@/lib/draft'

import { Badge, Box, Button, Code, Group, Text, Title } from '@mantine/core'

import Controls      from './controls'
import TimerProgress from '@/components/ui/TimerProgress'

interface Props {
  data    : DepositData
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ data, setView } : Props) {

  const clip  = useClipboard({ timeout: 500 })

  const color = () => {
    switch (data.status) {
      case 'pending' : return 'gray'
      case 'locked'  : return '#0068FD'
      case 'open'    : return '#3F8C4F'
      case 'settled' : return '#3F8C4F'
      case 'spent'   : return 'grey'
      case 'expired' : return 'red'
      case 'error'   : return 'red'
      default: return 'grey'
    }
  }

  return (
    <Box>
      <Group mb={20} style={{ justifyContent : 'space-between' }}>
        <Title order={2} mb={15}>
          Deposit Details
        </Title>
        <Controls setView={setView} />
      </Group>
      <Group mb={10}>
        <Text w={60}>DPID</Text>
        <Text>:</Text>
        <Code>{truncate_id(data.dpid)}</Code>
        <Button h={20} w={20} p={2}
          color={clip.copied ? 'teal' : 'blue'}
          onClick={() => clip.copy(data.dpid)}
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
      { data.confirmed && !data.spent &&
        <TimerProgress start={data.block_time} end={data.expires_at} />
      }
    </Box>
  )
}
