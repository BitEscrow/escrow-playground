import { Dispatch, SetStateAction } from 'react'
import { ContractData }             from '@scrow/core'

import { Badge, Box, Group, Text, Title } from '@mantine/core'

import Controls     from './controls'

interface Props {
  data ?: ContractData
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ data, setView } : Props) {

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

  return (
    <Box>
      <Group mb={20} style={{ justifyContent : 'space-between' }}>
      <Title order={2} mb={15}>
          Contract Details
        </Title>
        <Controls setView={setView} />
      </Group>
      <Group style={{ justifyContent : 'flex-start' }}>
        <Text>{`Status:`}</Text>
        <Badge
          mb={2}
          radius={15}
          color={color()}
        >
          {`${data?.status ?? 'loading'}`}
        </Badge>
      </Group>
    </Box>
  )
}
