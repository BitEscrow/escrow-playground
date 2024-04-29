import { ContractData } from '@scrow/sdk/core'

import {
  Stack,
  SegmentedControl
} from '@mantine/core'

import StampInput from '@/components/ui/StampInput'

interface Props {
  data: ContractData
}

export default function ({ data }: Props) {

  const state = get_state(data)

  return (
    <Stack>
      <SegmentedControl
        readOnly
        size='xs'
        data  = {[ 'Canceled', 'Activated', 'Closed', 'Spent', 'Settled' ]}
        value = {state}
      />
      <StampInput
        label="Created At"
        description="The timestamp for the creation of the contract record."
        value={data.created_at}
      />
      <StampInput
        label="Activated At"
        description="The timestamp for the activation of the contract vm."
        value={data.active_at}
      />
      <StampInput
        label="Closed At"
        description="The timestamp for the closing of the contract vm."
        value={data.closed_at}
      />
      <StampInput
        label="Spent At"
        description="The timestamp for the broadcast of the spending tx."
        value={data.spent_at}
      />
      <StampInput
        label="Settled At"
        description="The timestamp for the settlement of the spending tx."
        value={data.settled_at}
      />
      <StampInput
        label="Deadline At"
        description="The future timestamp when the contract funds must be secured."
        value={data.deadline_at}
      />
      <StampInput
        label="Expires At"
        description="The future timestamp when the contract execution must be closed."
        value={data.expires_at}
      />
      <StampInput
        label="Canceled At"
        description="The timestamp for the canceling of the contract record."
        value={data.canceled_at}
      />
    </Stack>
  )
}

export function get_state (contract : ContractData) {
  const { activated, canceled, closed, settled, spent } = contract
  switch (true) {
    case (settled):
      return 'Settled'
    case (spent):
      return 'Spent'
    case (closed):
      return 'Closed'
    case (activated):
      return 'Active'
    case (canceled):
      return 'Canceled'
    default:
      return 'Published'
  }
}

export function format_date (stamp : number | null) {
  return (stamp !== null)
    ? new Date(stamp * 1000)
    : undefined
}
