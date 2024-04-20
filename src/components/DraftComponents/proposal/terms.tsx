import { useDraftStore }  from '@/hooks/useDraft'
import { DateTimePicker } from '@mantine/dates'

import {
  Box,
  NumberInput
} from '@mantine/core'

export default function () {

  const draft  = useDraftStore()
  const prop   = draft.proposal
  const terms  = draft.terms
  const locked = terms.length > 0

  return (
    <Box>

      <NumberInput
        label="Contract Duration"
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
        label="Contract Feerate"
        disabled={locked && !terms.includes('feerate')}
        description="The rate to use (in sats per vbyte) for calculating transaction fees."
        value={prop.data.feerate}
        onChange={(e) => prop.update({ feerate : Number(e) })}
        step={1}
      />

      <DateTimePicker
        mt={15}
        label="Effective Date"
        disabled={locked && !terms.includes('effective')}
        description="Set a specific date for the contract to activate."
        placeholder='If left blank, the contract will activate immediately upon funding.'
        value={prop.data.effective ? new Date(prop.data.effective * 1000) : undefined}
        onChange={(e) => prop.update({ effective : e?.getUTCSeconds() })}
      />

      <NumberInput
        mt={15}
        label="Funding Duration"
        disabled={locked && !terms.includes('deadline')}
        description="The max duration of a published contract (in seconds) before it expires."
        value={prop.data.deadline}
        onChange={(e) => prop.update({ deadline : Number(e) })}
      />

    </Box>
  )
}


