import { useDraftStore } from '@/hooks/useDraft'

import {
  JsonInput,
  Stack,
  Text
} from '@mantine/core'

export default function () {

  const draft = useDraftStore()

  const rows = draft.data.members.map((e) => (
    <JsonInput
      autosize
      key={e.pub} 
      value={JSON.stringify(e, null, 2)}
    />
  ))

  return (
    <Stack>
      {rows.length === 0 && <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no members have joined the proposal</Text>}
      {rows.length !== 0 && rows}
    </Stack>
  )
}
