import { useDraftStore }  from '@/hooks/useDraft'
import { useForm }        from '@mantine/form'
import { DateTimePicker } from '@mantine/dates'

import {
  Box,
  Button,
  NumberInput
} from '@mantine/core'


export default function () {

  const draft  = useDraftStore()
  const prop   = draft.proposal
  const terms  = draft.terms
  const locked = terms.length > 0
  const form   = useForm({
    initialValues : prop.data
  })

  return (
    <Box>
      <NumberInput
        mt={15}
        label="Funding Duration"
        disabled={locked && !terms.includes('deadline')}
        description="The max duration of a published contract (in seconds) before it expires."
        {...form.getInputProps('deadline')}
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
        step={1}
      />

      <Button
        variant='subtle'
        style={{borderRadius: '15px', color: '#0068FD' }}
        onClick={() => { prop.update(form.values) }}
      >
        Update
      </Button>

    </Box>
  )
}


