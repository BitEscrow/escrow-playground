import { Dispatch, SetStateAction } from 'react'
import { ContractData }             from '@scrow/core'

import { Badge, Box, Group, Text, Title } from '@mantine/core'

import Controls from './controls'

interface Props {
  data   ?: ContractData
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ data, setView } : Props) {

  const status = (data !== undefined)
    ? (data.vm_state !== null)
      ? data.vm_state.status
      : 'inactive'
    : 'loading'

  const color = () => {
    switch (status) {
      case 'open'    : return '#3F8C4F'
      case 'disputed': return 'orange'
      case 'closed'  : return '#0068FD'
      default: return 'grey'
    }
  }

  return (
    <Box>
      <Group mb={20} style={{ justifyContent : 'space-between' }}>
        <Title order={2} mb={15}>
          Contract VM
        </Title>
        <Controls setView={setView} />
      </Group>
      <Group style={{ justifyContent : 'flex-start' }}>
        <Text>{`Status:`}</Text>
        <Badge mb={2} radius={5} color={color()}>
          {status}
        </Badge>
      </Group>
    </Box>
  )
}
