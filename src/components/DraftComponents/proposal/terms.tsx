import { ProposalData }      from '@scrow/sdk'
import { DateTimePicker }    from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'
import { IconX }             from '@tabler/icons-react'

import {
  Box,
  Button,
  NumberInput
} from '@mantine/core'

interface Props {
  form : UseFormReturnType<any>
}


export default function ({ form } : Props) {

  return (
    <Box>

      <NumberInput
        label="Contract Duration"
        description="The max duration of an active contract (in seconds) before it expires."
        min={60 * 30} // 30 mins minimum
        step={1}
        {...form.getInputProps('duration')}
      />

      <NumberInput
        mt={15}
        label="Contract Feerate"
        description="The rate to use (in sats per vbyte) for calculating transaction fees."
        step={1}
        min={1}
        max={1_000_000}
        {...form.getInputProps('feerate')}
      />

      <DateTimePicker
        mt={15}
        label="Effective Date"
        description="Set a specific date for the contract to activate."
        placeholder='If left blank, the contract will activate immediately upon funding.'
        value={get_date(form.getValues().effective)}
        onChange={(e) => {
          if (e !== null) {
            form.setFieldValue('effective', e.getUTCSeconds())
          }
        }}
        rightSection={
          <Button
            onClick={() => form.setValues({ effective : undefined })}
          >
            <IconX size={'14px'}/>
          </Button>
        }
      />

      <NumberInput
        mt={15}
        label="Funding Duration"
        description="The max duration of a published contract (in seconds) before it expires."
        min={60 * 30} // 30 mins minimum
        {...form.getInputProps('deadline')}
      />

    </Box>
  )
}

function get_date (stamp ?: number) {
  return (stamp !== undefined)
    ? new Date(stamp * 1000)
    : null
}
