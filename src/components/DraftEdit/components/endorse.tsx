import { IconRubberStamp } from '@tabler/icons-react'
import { EscrowSigner }    from '@scrow/sdk'
import { DraftStore }      from '@scrow/hooks'

import {
  Box,
  Button,
  Chip,
  Group,
  Text
} from '@mantine/core'

interface Props {
  draft  : DraftStore
  signer : EscrowSigner
}

export default function ({ draft, signer } : Props) {
  const can_sign = (
    signer.draft.is_member(draft.data)  &&
    !signer.draft.is_signed(draft.data)
  )

  return (
    <Box mt={30} mb={20}>
      <Text size='lg' fw={700}>Endorsements</Text>
      <Text size='sm' mb={30} c={'dimmed'}>List of endorsements for the draft.</Text>

      <Group h={20} mb={20} mt={20}>
        { draft.data.members.map(e => {
          return <Chip color='#00AB83' key={e.pub}>
            { get_alias(e.pub) }
          </Chip>
        }) }
      </Group>
      { can_sign &&
        <Button 
          mt={15}
          style={{ borderRadius: '15px' }}
          leftSection={<IconRubberStamp size={14}/>}
          onClick={() => draft.member.endorse(signer)}
        >
          Endorse
        </Button>
      
      }
    </Box>
  )
}

function get_alias (pubkey : string) {
  return pubkey.slice(0, 8)
}
