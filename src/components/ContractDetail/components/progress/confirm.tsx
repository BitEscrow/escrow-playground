// Progress bar for tx confirmation.

import { Box }          from '@mantine/core'
import { ContractData } from '@scrow/sdk'

// Should estimate time based on current fee, and number of blocks.

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  return (
    <Box></Box>
  )
}