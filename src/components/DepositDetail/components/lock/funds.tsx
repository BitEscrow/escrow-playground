import { ContractData } from '@scrow/sdk'

import { Card, Code, SimpleGrid, Text } from '@mantine/core'

interface Props {
  contract : ContractData
}

export default function ({ contract } : Props) {
  const { fund_count, fund_pend, fund_value, tx_total } = contract

  const available = fund_pend + fund_value
  const remaining = tx_total - available

  return (
    <Card withBorder>
      <Text>Funds Summary:</Text>
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
        <Text>Depoists:</Text>
        <Code>{fund_count}</Code>
        <Text>Allocated:</Text>
        <Code>{available}</Code>
        <Text>Balance:</Text>
        <Code>{remaining}</Code>
      </SimpleGrid>
    </Card>
  )
}
