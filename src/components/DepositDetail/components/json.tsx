import { DepositData }    from '@scrow/sdk/core'
import { Box, JsonInput } from '@mantine/core'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  return (
    <Box>
      <JsonInput
        mb={20}
        formatOnBlur
        autosize
        minRows={4}
        maxRows={25}
        value={JSON.stringify(data, null, 2)}
      />
    </Box>
  )
}
