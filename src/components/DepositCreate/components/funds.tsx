import { ContractData } from '@scrow/sdk'

import { Card, Code, SimpleGrid, Text }  from '@mantine/core'
import { get_contract_value } from '@scrow/sdk/contract'

interface Props {
  contract : ContractData
}

export default function ({ contract } : Props) {
  const tx_total = get_contract_value(contract)
  const { vin_count, funds_pend, funds_conf } = contract

  const available = funds_pend + funds_conf
  const remaining = tx_total - available

  return (
    <Card withBorder mb={15} >
      <Text ta='center' mb={10}>Funding Status:</Text>
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
        <Text>Deposits:</Text>
        <Code>{vin_count}</Code>
        <Text>Amount:</Text>
        <Code>{available} sats</Code>
        <Text>Balance:</Text>
        <Code>{remaining} sats</Code>
      </SimpleGrid>
    </Card>
  )
}
