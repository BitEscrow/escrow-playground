// Progress bar for contract execution

import { Box }          from '@mantine/core'
import { ContractData } from '@scrow/sdk'

// Should show progress of running, from created to now, to expiration.
// Should change from running to closed based on status
// Should also show current output, current hash, current stamp

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  return (
    <Box></Box>
  )
}