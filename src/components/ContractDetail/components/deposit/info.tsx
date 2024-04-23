import { Box, Code, Text } from '@mantine/core'
import { DepositData }     from '@scrow/sdk'

interface Props {
  deposit : DepositData
}

export default function ({ deposit } : Props) {
  return (
    <Box>
      <Text>Deposit Id:</Text>
      <Code>{deposit.dpid}</Code>
    </Box>
  )
}