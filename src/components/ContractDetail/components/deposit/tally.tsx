import { ContractData } from '@scrow/sdk/core'

import { Box, Group, Progress, Text, Tooltip } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const fund_pend = (data.fund_pend > 0)
    ? Math.max(Math.floor(data.tx_total / data.fund_pend) * 100, 100)
    : 0
  const fund_value = (data.fund_value > 0)
    ? Math.max(Math.floor(data.tx_total / data.fund_value) * 100, 100)
    : 0

  return (
    <Box>
      <Group align="center">
        <Text>{`${data.fund_pend} pending`}</Text>
        <Text>/</Text>
        <Text>{`${data.fund_value} secured`}</Text>
        <Text>/</Text>
        <Text>{`${data.tx_total} total`}</Text>
      </Group>
      <Progress.Root size={24} radius={'lg'}>
        <Tooltip label={`fund_pend: ${data.fund_pend} sats`}>
          <Progress.Section value={fund_pend} color="orange">
            <Progress.Label>{`fund_pend: ${data.fund_pend} sats`}</Progress.Label>
          </Progress.Section>
        </Tooltip>
        <Tooltip label={`Secured: ${data.fund_value} sats`}>
          <Progress.Section value={fund_value} color="#3F8C4F">
            <Progress.Label>{`Secured: ${data.fund_value} sats`}</Progress.Label>
          </Progress.Section>
        </Tooltip>
      </Progress.Root>
    </Box>
  )
}
