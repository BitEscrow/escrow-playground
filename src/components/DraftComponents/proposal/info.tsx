import { ProposalData }      from '@scrow/sdk'
import { UseFormReturnType } from '@mantine/form'
import CONFIG                from '@/config/index.js'

import {
  Box,
  NativeSelect,
  NumberInput,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useDraftStore } from '@/hooks/useDraft'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ({ form } : Props) {

  const draft = useDraftStore()

  return (
    <Box>
      <TextInput
        label="Title"
        description="The main title of the proposal."
        {...form.getInputProps('title')}
      />

      <Textarea
        mt={15}
        label="Content"
        description="User-defined field for storing content."
        {...form.getInputProps('content')}
      />

      <NativeSelect
        mt={15}
        label="Engine"
        description="The virtual machine to use for this contract."
        {...form.getInputProps('engine')}
        data={CONFIG.settings.engines}
      />

      <TextInput
        disabled
        mt={15}
        label="Network"
        description="The blockchain network to use for this contract."
        value={draft.proposal.data.network}
      />

      <NumberInput
        mt={15}
        label="Value"
        description="The total value of the proposal (in sats)."
        min={1000}
        {...form.getInputProps('value')}
      />
    </Box>
  )
}

