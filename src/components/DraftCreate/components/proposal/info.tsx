import { useDraftStore }  from '@/hooks/useDraft'
import { useForm }        from '@mantine/form'

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

  const form   = useForm({
    initialValues : {
      title    : prop.data.title,
      content  : prop.data.content,
      duration : prop.data.duration,
      value    : prop.data.value
    }
  })

  return (
    <Box>
      <TextInput
        label="Title"
        disabled={locked && !terms.includes('title')}
        description="The main title of the proposal."
        {...form.getInputProps('title')}
      />

      <JsonInput
        label="Content"
        disabled={locked && !terms.includes('content')}
        description="Json field for storing custom content."
        {...form.getInputProps('content')}
      />

      <NumberInput
        label="Duration"
        disabled={locked && !terms.includes('duration')}
        description="The max duration of an active contract (in seconds) before it expires."
        {...form.getInputProps('duration')}
        min={60 * 30} // 30 mins minimum
        max={1209600} // 2 weeks max in seconds
        step={1}
      />

      <NumberInput
        mt={15}
        withAsterisk
        label="Value"
        disabled={locked && !terms.includes('value')}
        description="The total value of the proposal (in sats)."
        {...form.getInputProps('value')}
        min={1000}
      />
    </Box>
  )
}


