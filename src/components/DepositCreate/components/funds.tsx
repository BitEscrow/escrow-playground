import { ContractData } from '@scrow/sdk'

import { Card, Code, SimpleGrid, Text }  from '@mantine/core'

interface Props {
  contract : ContractData
}

export default function ({ contract } : Props) {
  const { fund_count, fund_pend, fund_value, tx_total } = contract

  const available = fund_pend + fund_value
  const remaining = tx_total - available

  return (
    <Card withBorder mb={15} >
      <Text ta='center' mb={10}>Funding Status:</Text>
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
        <Text>Deposits:</Text>
        <Code>{fund_count}</Code>
        <Text>Amount:</Text>
        <Code>{available} sats</Code>
        <Text>Balance:</Text>
        <Code>{remaining} sats</Code>
      </SimpleGrid>
    </Card>
  )
}
