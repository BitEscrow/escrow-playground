import { ContractData } from '@scrow/sdk/core'

import { Box, Group, Progress, Text, Tooltip } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const fund_pend_pct = (data.fund_pend > 0)
    ? Math.max(Math.floor(data.fund_pend / data.tx_total) * 100, 100)
    : 0
  const fund_value_pct = (data.fund_value > 0)
    ? Math.max(Math.floor(data.fund_value / data.tx_total) * 100, 100)
    : 0

  const fund_total_pct   = Math.max(fund_pend_pct + fund_value_pct, 100)
  const fund_balance_pct = Math.max(100 - fund_total_pct, 0)
  const is_paid    = fund_balance_pct === 0
  const paid_label = is_paid ? 'paid' : 'secured' 

  return (
    <Box>
      <Progress.Root size={24} radius="sm">
        <Tooltip label={'pending'}>
          <Progress.Section value={fund_pend_pct} color="orange">
            <Progress.Label>{'pending'}</Progress.Label>
          </Progress.Section>
        </Tooltip>
        <Tooltip label={'secured'}>
          <Progress.Section value={fund_value_pct} color="#3F8C4F">
            <Progress.Label>{paid_label}</Progress.Label>
          </Progress.Section>
        </Tooltip>
        <Tooltip label={'balance'}>
          <Progress.Section value={fund_balance_pct} color="#3F8C4F">
            <Progress.Label>{'balance'}</Progress.Label>
          </Progress.Section>
        </Tooltip>
      </Progress.Root>
      <Group mt={10} justify='center'>
        <Text>{`${data.fund_pend} pending`}</Text>
        <Text>/</Text>
        <Text>{`${data.fund_value} secured`}</Text>
        <Text>/</Text>
        <Text>{`${data.tx_total} total`}</Text>
      </Group>
    </Box>
  )
}
