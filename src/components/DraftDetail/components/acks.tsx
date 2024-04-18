import {
  DraftSession
} from '@scrow/sdk/core'

import {
  Box,
  Button,
  Chip,
  Group,
  Text
} from '@mantine/core'
import { IconRubberStamp } from '@tabler/icons-react'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {

  const aliases = new Map(data.members.map(e => {
    return [ e.pub, get_alias(e.pub) ]
  }))

  const approvals = data.approvals.map(e => e.slice(0, 64))

  return (
    <Box mt={30} mb={20}>
      <Text size='lg' fw={700}>Approvals</Text>
      <Text size='sm' mb={30} c={'dimmed'}>List of signatures that have approved the draft.</Text>

      <Group h={20} mb={20} mt={20}>
        { data.members.map(e => {
          return <Chip color='#00AB83' key={e.id} checked={approvals.includes(e.pub)}>
            { aliases.get(e.pub) ?? 'undefined' }
          </Chip>
        }) }
      </Group>
      <Button 
        mt={15}
        style={{
          borderRadius: '15px',
          backgroundColor: session.is_full && !session.is_approved ? '#0068FD' : '#f7f8f9',
        }}
        leftSection={<IconRubberStamp size={14}/>}
        disabled={!session.is_full || session.is_approved}
        onClick={() => session.approve()}
      >
        Approve
      </Button>
    </Box>
  )
}

function get_alias (pubkey : string) {
  return pubkey.slice(0, 8)
}