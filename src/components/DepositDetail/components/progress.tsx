import { ContractData }      from '@scrow/sdk/core'
import { Progress, Tooltip } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const pending = (data.fund_pend > 0)
    ? Math.max(Math.floor(data.tx_total / data.fund_pend) * 100, 100)
    : 0
  const balance = (data.fund_value > 0)
    ? Math.max(Math.floor(data.tx_total / data.fund_value) * 100, 100)
    : 0

  return (
    <Progress.Root size={30}>
      <Tooltip label={`Pending: ${data.fund_pend} sats`}>
        <Progress.Section value={pending} color="orange">
          <Progress.Label>{`Pending: ${data.fund_pend} sats`}</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label={`Secured: ${data.fund_value} sats`}>
        <Progress.Section value={balance} color="#3F8C4F">
          <Progress.Label>{`Secured: ${data.fund_value} sats`}</Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  );
}