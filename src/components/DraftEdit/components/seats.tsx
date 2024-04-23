import { EscrowSigner }  from '@scrow/sdk/client'
import { useDraftStore } from '@/hooks/useDraft'

import { Box, Button, Group, Text } from '@mantine/core'

import {
  IconPlus,
  IconLogout
} from '@tabler/icons-react'
import { format_label } from '@/lib/draft'

interface Props {
  signer : EscrowSigner
}

export default function ({ signer } : Props) {

  const draft = useDraftStore()

  return (
    <Box>
      <Text size='sm' mb={10} c={'dimmed'}>Avalible seats in the contract.</Text>
      <Group gap={'xl'}>
        { draft.roles.map(e => {
          const is_mbr  = signer.draft.is_member(draft.data)
          const is_pol  = signer.draft.is_role(e.id, draft.data)
          const curr    = draft.members.filter(x => x.pid === e.id).length
          const is_full = curr >= e.data.max_num
          return (
            <Box key={ e.id }>
              <Text ta={'center'}>{format_label(e.data.title)}</Text>
              <Text ta={'center'}>{`${e.data.min_num} / ${curr} / ${e.data.max_num}`}</Text>
              <Button
                style={{ borderRadius: '15px', backgroundColor: !is_pol && is_full ? '#F7F8F9' : '#0068FD' }}
                leftSection={(is_pol) ? <IconLogout size={14}/> : <IconPlus size={14}/>}
                disabled = {(!is_pol && is_full) || (is_mbr && !is_pol)}
                onClick  = {() => {
                  if (is_pol) {
                    draft.member.leave(signer)
                  } else {
                    draft.member.join(e.id, signer)
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


