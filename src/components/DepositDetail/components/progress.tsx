import { now } from '@scrow/sdk/util'

import { DepositData, TxIsConfirmed } from '@scrow/sdk/core'
import { Progress, Tooltip }          from '@mantine/core'

interface Props {
  data : DepositData & TxIsConfirmed
}

export default function ({ data } : Props) {
  const current = now()
  const elapsed = current - data.confirmed_at
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