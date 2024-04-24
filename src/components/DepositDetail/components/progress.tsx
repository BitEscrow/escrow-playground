import { now } from '@scrow/sdk/util'

import { DepositData, TxConfirmedState } from '@scrow/sdk/core'
import { Progress, Tooltip }             from '@mantine/core'

interface Props {
  data : DepositData & TxConfirmedState
}

export default function ({ data } : Props) {
  const current = now()
  const elapsed = current - data.block_time
  const remain  = data.expires_at - current

  const elapsed_pct = Math.min(Math.floor((elapsed / remain) * 100), 100)
  const remain_pct  = Math.min(100 - elapsed_pct, 0)

  const elapsed_val = (data.spent) ? 100 : elapsed_pct
  const elapsed_clr = (data.spent) ? 'darkslateblue' : 'darkgreen'

  return (
    <Progress.Root size={10}>
      <Tooltip label={`Time Elapsed: ${elapsed} seconds`}>
        <Progress.Section value={elapsed_val} color={elapsed_clr}>
        </Progress.Section>
      </Tooltip>
      <Tooltip label={`Time Remaining: ${remain} seconds`}>
        <Progress.Section value={remain_pct} color="#3F8C4F">
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  );
}