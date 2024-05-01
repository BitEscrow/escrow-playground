import { format_label } from '@/lib/draft'
import { DraftStore }   from '@scrow/hooks'

import { Button, Card, Code, Group, Stack, Text } from '@mantine/core'

import {
  IconPlus,
  IconLogout
} from '@tabler/icons-react'
import { useSigner } from '@/hooks/useSigner'

interface Props {
  draft  : DraftStore
}

export default function ({ draft } : Props) {
  const { signer } = useSigner()

  return (
    <Stack align='center'>
      <Group gap={'lg'}>
        { draft.roles.map(e => {
          const is_mbr  = signer !== null && signer.draft.is_member(draft.data)
          const is_pol  = signer !== null && signer.draft.is_role(e.id, draft.data)
          const curr    = draft.members.filter(x => x.pid === e.id).length
          const is_full = curr >= e.data.seats

          const submit = () => {
            if (signer !== null) {
              if (is_pol) {
                draft.member.leave(signer)
              } else {
                draft.member.join(e.id, signer)
              }
            }
          }
          return (
            <Card key={ e.id } withBorder radius={5}>
              <Text mb={5} ta={'center'}>{format_label(e.data.title)}</Text>
              <Code mb={15} ta={'center'}>{`${curr} / ${e.data.seats}`}</Code>
              { signer !== null &&
                <Button
                  style={{ borderRadius: '15px', backgroundColor: !is_pol && is_full ? '#F7F8F9' : '#0068FD' }}
                  leftSection={(is_pol) ? <IconLogout size={14}/> : <IconPlus size={14}/>}
                  disabled = {(!is_pol && is_full) || (is_mbr && !is_pol)}
                  onClick  = {submit}
                >
                { (is_pol) ? 'Leave' : 'Join' }
              </Button>
            }
            </Card>
          )
        })}
      </Group>
      { signer === null && <Text fs="italic" c='dimmed' size='sm'>please login to your device in order to join a seat</Text>}
    </Stack>
  )
}


