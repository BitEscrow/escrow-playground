import { useForm }       from '@mantine/form'
import { machines }      from '@/config'
import { useDraftStore } from '@/hooks/useDraft'

import {
  Box,
  NativeSelect,
  NumberInput,
  TextInput,
  Textarea,
} from '@mantine/core'

export default function () {

  const draft  = useDraftStore()
  const prop   = draft.proposal
  const terms  = draft.terms
  const locked = terms.length > 0

  const form   = useForm({
    initialValues : {
      title   : prop.data.title,
      content : prop.data.content,
      engine  : prop.data.engine,
      value   : prop.data.value
    },
    validate : {
      title   : validate_title,
      content : validate_content,
      value   : validate_value
    },
    onValuesChange: (values) => {
      form.validate()
      if (form.isValid()) {
        prop.update({ ...values })
      }
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

      <Textarea
        mt={15}
        label="Content"
        disabled={locked && !terms.includes('content')}
        description="User-defined field for storing content."
        {...form.getInputProps('content')}
      />

      <NativeSelect
        mt={15}
        label="Engine"
        description="The virtual machine to use for this contract."
        {...form.getInputProps('engine')}
        data={machines}
      />

      <NumberInput
        mt={15}
        label="Value"
        disabled={locked && !terms.includes('value')}
        description="The total value of the proposal (in sats)."
        min={1000}
        {...form.getInputProps('value')}
      />
    </Box>
  )
}

function validate_title (title : string) {
  if (typeof title !== 'string') {
    return 'Contract title must be a string!'
  } else if (title.length > 256) {
    return 'Contract title is too long!'
  } else if (title.length < 32) {
    return 'Contract title is too short!'
  } else if (!/^[a-zA-Z0-9\-_\s]+$/.test(title)) {
    return 'Contract title contains invalid characters!'
  } else {
    return null
  }
}

function validate_value (value : number) {
  if (typeof value !== 'number') {
    return 'Invalid value!'
  } else if (value > Number.MAX_SAFE_INTEGER) {
    return 'Contract value is too large.'
  } else if (value < 10000) {
    return 'Contract value must be a minimum of 10000 sats.'
  } else {
    return null
  }
}

function validate_content (content ?: string) {
  if (content === undefined) {
    return null
  } else if (typeof content !== 'string') {
    return 'Content value must be a string!'
  } else if (content.length > 4096) {
    return 'Contract title is too long!'
  } else {
    return null
  }
}