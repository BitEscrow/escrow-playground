import { Dispatch, SetStateAction } from 'react'
import { DepositData }              from '@scrow/core'

import { Badge, Box, Group, Text, Title } from '@mantine/core'

import Controls     from './controls'

interface Props {
  data ?: DepositData
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ data, setView } : Props) {

  const color = () => {
    switch (data?.status) {
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
      <Group style={{ justifyContent : 'flex-start' }}>
        <Text>{`Status:`}</Text>
        <Badge
          mb={2}
          radius={5}
          color={color()}
        >
          {`${data?.status ?? 'loading'}`}
        </Badge>
      </Group>
    </Box>
  )
}
