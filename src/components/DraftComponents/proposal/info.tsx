import { useDraftStore }  from '@/hooks/useDraft'

import {
  Box,
  JsonInput,
  NumberInput,
  TextInput,
} from '@mantine/core'

export default function () {

  const draft  = useDraftStore()
  const prop   = draft.proposal
  const terms  = draft.terms
  const locked = terms.length > 0

  return (
    <Box>
      <TextInput
        label="Title"
        disabled={locked && !terms.includes('title')}
        description="The main title of the proposal."
        value={prop.data.title}
        onChange={(e) => prop.update({ title : e.target.value })}
      />

      <JsonInput
        label="Content"
        disabled={locked && !terms.includes('content')}
        description="Json field for storing custom content."
        value={prop.data.content}
        onChange={ (e) => prop.update({ content : e })}
      />

      <NumberInput
        label="Duration"
        disabled={locked && !terms.includes('duration')}
        description="The max duration of an active contract (in seconds) before it expires."
        min={60 * 30} // 30 mins minimum
        max={1209600} // 2 weeks max in seconds
        step={1}
        value={prop.data.duration}
        onChange={(e) => prop.update({ duration : Number(e) })}
      />

      <NumberInput
        mt={15}
        withAsterisk
        label="Value"
        disabled={locked && !terms.includes('value')}
        description="The total value of the proposal (in sats)."
        min={1000}
        value={prop.data.value}
        onChange={(e) => prop.update({ value : Number(e) })}
      />
    </Box>
  )
}


