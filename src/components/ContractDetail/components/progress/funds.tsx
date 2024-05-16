import { ContractData }       from '@scrow/sdk'
import { get_contract_value } from '@scrow/sdk/contract'

import { Box, Group, Progress, Text, Tooltip } from '@mantine/core'

import TimerProgress from '@/components/ui/TimerProgress'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const tx_total = get_contract_value(data)
  const { activated, canceled, vin_count, funds_pend, funds_conf } = data
  const funds_pend_pct = (funds_pend > 0)
    ? Math.min(Math.floor((funds_pend / tx_total) * 100), 100)
    : 0
  const funds_conf_pct = (funds_conf > 0)
    ? Math.min(Math.floor((funds_conf / tx_total) * 100), 100)
    : 0

  const fund_total_pct   = Math.min(funds_pend_pct + funds_conf_pct, 100)
  const fund_balance_pct = Math.max(100 - fund_total_pct, 0)
  const is_paid    = fund_balance_pct === 0
  const zero_label = vin_count === 0 ? 'no funds' : ''
  const paid_label = is_paid ? 'paid' : 'secured'

  return (
    <Box>
      <Progress.Root size={24} radius="5px 5px 0 0">
        <Tooltip label={'pending'}>
          <Progress.Section value={funds_pend_pct} color="orange">
            <Progress.Label>{'pending'}</Progress.Label>
          </Progress.Section>
        </Tooltip>
        <Tooltip label={'secured'}>
          <Progress.Section value={funds_conf_pct} color="rgb(63, 140, 79)">
            <Progress.Label>{paid_label}</Progress.Label>
          </Progress.Section>
        </Tooltip>
        <Tooltip label={'balance'}>
          <Progress.Section value={fund_balance_pct} color="grey">
          <Progress.Label>{zero_label}</Progress.Label>
          </Progress.Section>
        </Tooltip>
      </Progress.Root>
      { !canceled && !activated && <TimerProgress start={data.created_at} end={data.deadline_at} radius='0 0 5px 5px'/> }
      <Group mt={10} justify='center'>
        <Text>{`${data.funds_pend} pending`}</Text>
        <Text>/</Text>
        <Text>{`${data.funds_conf} secured`}</Text>
        <Text>/</Text>
        <Text>{`${data.tx_total} total`}</Text>
      </Group>
    </Box>
  )
}
