import { Dispatch, SetStateAction } from 'react'
import { ContractData }             from '@scrow/sdk/core'

import { Anchor, Badge, Box, Group, Text, Title } from '@mantine/core'

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

  const cid   = (data !== undefined) ? data.cid.slice(0, 8) +  ' ... ' + data.cid.slice(-8) : ''
  const title = (data !== undefined) ? data.terms.title : ''

  return (
    <Box>
      <Group style={{ justifyContent : 'space-between', alignItems: 'flex-start' }}>
        <Title order={3} mb={20} styles={{ }} maw="75%" lineClamp={2}>
          {title}
        </Title>
        <Controls setView={setView} />
      </Group>
      <Group mb={10}>
        <Text w={50}>{`CID:`}</Text>
        <Anchor href={window.location.href} >{cid}</Anchor>
      </Group>
      <Group>
        <Text w={50}>{`Status:`}</Text>
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
