import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'

import { TextInput, Box, Title } from '@mantine/core'
import ProposalTotalView from './components/totals'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalInfoView({ form } : Props) {

  return (
    <Box maw={500}>
      <TextInput
        withAsterisk
        label="Title"
        {...form.getInputProps('title')}
      />
      <Title order={4}>Spending Paths</Title>
      <ProposalTotalView form={ form } />
    </Box>
  )
}
