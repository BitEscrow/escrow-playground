import { DraftData, DraftSession }  from '@scrow/sdk/core'
import { Box, Button, Group, Text } from '@mantine/core'

import {
  IconPlus,
  IconLogout
} from '@tabler/icons-react'


interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {

  return (
    <Box h={200}>
      <Text size='lg' fw={700}>Seats</Text>
      <Text size='sm' mb={30} c={'dimmed'}>Avalible seats in the contract - click to join or leave. </Text>
      <Group h={20} gap={'xl'}>
        { data.roles.map(e => {
          const is_mbr  = session.is_member
          const is_pol  = is_mbr && session.mship.pol === e.id
          const curr    = data.members.filter(x => x.pol === e.id).length
          const is_full = curr >= e.max_slots
          return (
            <Box key={ e.id }>
              <Text ta={'center'}>{e.title}</Text>
              <Text ta={'center'}>{`${e.min_slots} / ${curr} / ${e.max_slots}`}</Text>
              <Button
                style={{borderRadius: '15px', backgroundColor: is_pol && is_full ? '#0068FD' : '#F7F8F9'}}
                leftSection={(is_pol) ? <IconLogout size={14}/> : <IconPlus size={14}/>}
                disabled = {(!is_pol && is_full) || (is_mbr && !is_pol)}
                onClick  = {() => {
                  if (is_pol) {
                    session.leave()
                  } else {
                    session.join(e.id)
                  }
                }}
              >
                { (is_pol) ? 'Leave' : 'Join' }
              </Button>
            </Box>
          )
        })}
      </Group>
    </Box>
  )
}


