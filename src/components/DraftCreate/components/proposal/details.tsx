import { DraftSession }      from '@scrow/sdk/client'
import { Dispatch, SetStateAction } from 'react'
import { DateTimePicker }    from '@mantine/dates'

import {
  Box,
  JsonInput,
  // NativeSelect,
  NumberInput,
  TextInput,
} from '@mantine/core'

interface Props {
  data    : DraftSession
  setData : Dispatch<SetStateAction<DraftSession | undefined>>
}

export default function ({ data, setData } : Props) {

  const terms  = form.values.terms
  const locked = terms.length > 0

  return (
    <Box>
      <TextInput
        withAsterisk
        disabled={locked && !terms.includes('title')}
        label="Title"
        description="The main title of the proposal."
        
      />

      <JsonInput
        mt={15}
        label="Content"
        disabled={locked && !terms.includes('content')}
        description="Json field for storing custom content."
        {...form.getInputProps('content')}
      />

      <NumberInput
        mt={15}
        withAsterisk
        label="Value"
        disabled={locked && !terms.includes('value')}
        description="The total value of the proposal (in sats)."
        {...form.getInputProps('value')}
        defaultValue={1000}
        min={1000}
      />

      <NumberInput
        mt={15}
        label="Funding Duration"
        disabled={locked && !terms.includes('deadline')}
        description="The max duration of a published contract (in seconds) before it expires."
        {...form.getInputProps('deadline')}
      />

      <NumberInput
        mt={15}
        withAsterisk
        label="Contract Duration"
        disabled={locked && !terms.includes('duration')}
        description="The max duration of an active contract (in seconds) before it expires."
        {...form.getInputProps('duration')}
        defaultValue={0}
        min={60 * 30} // 30 mins minimum
        max={1209600} // 2 weeks max in seconds
        step={1}
      />

      <DateTimePicker
        mt={15}
        label="Activation Date"
        disabled={locked && !terms.includes('effective')}
        description="Set a specific date for the contract to activate."
        {...form.getInputProps('effective')}
      />

      <NumberInput
        mt={15}
        label="Fee Rate"
        disabled={locked && !terms.includes('feerate')}
        description="The rate to use (in sats per vbyte) for calculating transaction fees."
        {...form.getInputProps('feerate')}
        defaultValue={1}
        step={1}
      />

    </Box>
  )
}


