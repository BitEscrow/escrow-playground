import { DraftStore } from '@scrow/hooks'

import { format_label, truncate_id } from '@/lib/draft'

import {
  Card,
  Code,
  Group,
  Stack,
  Text
} from '@mantine/core'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  const pubs = draft.sigs.map(e => e.slice(0, 64))
  const rows = draft.data.members.map((mbr) => {
    const role = draft.data.roles.find(e => e.id === mbr.pid)
    if (role === undefined) throw new Error('Role not found: ' + mbr.pid)
    return (
      <Card withBorder key={mbr.pub}>
        <Group>
          <Text size='sm' w={75} ff="monospace">Endorsed</Text>
          <Text>:</Text>
          <Code>{pubs.includes(mbr.pub) ? 'True' : 'False'}</Code>
        </Group>
        <Group>
          <Text size='sm' w={75} ff="monospace">Pubkey</Text>
          <Text>:</Text>
          <Code>{truncate_id(mbr.pub)}</Code>
        </Group>
        <Group>
          <Text size='sm' w={75} ff="monospace">Role</Text>
          <Text>:</Text>
          <Code>{format_label(role.title)}</Code>
        </Group>
        <Group>
          <Text size='sm' w={75} ff="monospace">XPub</Text>
          <Text>:</Text>
          <Code>{truncate_id(mbr.xpub)}</Code>
        </Group>
      </Card>
    )
  })

  return (
    <Stack align='center'>
      {rows.length === 0 && <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no members have joined the proposal</Text>}
      {rows.length !== 0 && rows}
    </Stack>
  )
}
