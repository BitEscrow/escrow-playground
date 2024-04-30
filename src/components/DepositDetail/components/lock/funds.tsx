import { ContractData, DepositData }    from '@scrow/sdk'
import { Card, Code, SimpleGrid, Text } from '@mantine/core'

interface Props {
  contract : ContractData
  deposit  : DepositData
}

export default function ({ contract, deposit } : Props) {
  const { fund_count, fund_pend, fund_value, tx_total } = contract

  const available = fund_pend + fund_value
  const remaining = tx_total - available
  const new_total = available + deposit.utxo.value

  return (
    <Card withBorder>
      <Text fw={700} size='sm' ta='center' mb={10}>Funding Summary</Text>
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
        <Text>Deposits:</Text>
        <Code>{fund_count}</Code>
        <Text>Allocated:</Text>
        <Code>{available} sats</Code>
        <Text>Balance:</Text>
        <Code>{remaining} sats</Code>
        <Text>New Total:</Text>
        <Code>{new_total} sats</Code>
      </SimpleGrid>
    </Card>
  )
}
