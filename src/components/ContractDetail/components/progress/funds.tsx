import { ContractData } from '@scrow/sdk/core'

import { Box, Group, Progress, Text, Tooltip } from '@mantine/core'
import TimerProgress from '@/components/ui/TimerProgress'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const { fund_count, fund_pend, fund_value, tx_total } = data
  const fund_pend_pct = (fund_pend > 0)
    ? Math.min(Math.floor((fund_pend / tx_total) * 100), 100)
    : 0
  const fund_value_pct = (fund_value > 0)
    ? Math.min(Math.floor((fund_value / tx_total) * 100), 100)
    : 0

  const fund_total_pct   = Math.min(fund_pend_pct + fund_value_pct, 100)
  const fund_balance_pct = Math.max(100 - fund_total_pct, 0)
  const is_paid    = fund_balance_pct === 0
  const zero_label = fund_count === 0 ? 'no funds' : ''
  const paid_label = is_paid ? 'paid' : 'secured'

  return (
    <Box>
      <Progress.Root size={24} radius="5px 5px 0 0">
        <Tooltip label={'pending'}>
          <Progress.Section value={fund_pend_pct} color="orange">
            <Progress.Label>{'pending'}</Progress.Label>
          </Progress.Section>
        </Tooltip>
        <Tooltip label={'secured'}>
          <Progress.Section value={fund_value_pct} color="rgb(63, 140, 79)">
            <Progress.Label>{paid_label}</Progress.Label>
          </Progress.Section>
        </Tooltip>
        <Tooltip label={'balance'}>
          <Progress.Section value={fund_balance_pct} color="grey">
          <Progress.Label>{zero_label}</Progress.Label>
          </Progress.Section>
        </Tooltip>
      </Progress.Root>
      <TimerProgress active={!data.canceled} start={data.created_at} end={data.deadline_at} radius='0 0 5px 5px'/>
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
