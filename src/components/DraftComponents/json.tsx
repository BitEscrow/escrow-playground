import { Box, JsonInput } from '@mantine/core'
import { DraftStore }     from '@scrow/hooks'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  return (
    <Box mb={15} maw={700}>
      <JsonInput
        readOnly
        label="JSON Template"
        description="The JSON template for your draft session."
        placeholder="copy/paste your proposal JSON"
        formatOnBlur
        autosize
        minRows={4}
        maxRows={15}
        value={JSON.stringify(draft.data, null, 2)}
      />
    </Box>
  )
}
