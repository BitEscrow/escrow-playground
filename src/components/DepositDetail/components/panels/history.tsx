import { DepositData } from '@scrow/sdk/core'

import {
  Stack,
  SegmentedControl
} from '@mantine/core'

import StampInput from '@/components/ui/StampInput'

interface Props {
  data: DepositData
}

export default function ({ data }: Props) {

  const state = get_state(data)

  return (
    <Stack>
      <SegmentedControl
        readOnly
        size='xs'
        data  = {[ 'Pending', 'Open', 'Locked', 'Spent', 'Settled' ]}
        value = {state}
      />
      <StampInput
        label="Created At"
        description="The timestamp for the creation of the deposit record."
        value={data.created_at}
      />
      <StampInput
        label="Confirmed At"
        description="The network timestamp of the confirming block."
        value={data.block_time}
      />
      <StampInput
        label="Locked At"
        description="The timestamp for the locking of the deposit record."
        value={null}
      />
      <StampInput
        label="Spent At"
        description="The timestamp for when the spending tx was broadcast."
        value={data.spent_at}
      />
      <StampInput
        label="Settled At"
        description="The timestamp for when the spending tx was settled."
        value={data.settled_at}
      />
      <StampInput
        label="Expires At"
        description="The future timestamp for when the deposit will expire."
        value={data.expires_at}
      />
    </Stack>
  )
}

export function get_state (deposit : DepositData) {
  const { confirmed, covenant, settled, spent } = deposit
  switch (true) {
    case (settled):
      return 'Settled'
    case (spent):
      return 'Spent'
    case (covenant !== null):
      return 'Locked'
    case (confirmed):
      return 'Active'
    default:
      return 'Pending'
  }
}
