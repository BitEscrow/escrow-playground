import { ContractData }   from '@scrow/sdk/core'
import { DateTimePicker } from '@mantine/dates'

import {
  Stack,
  SegmentedControl
} from '@mantine/core'

interface Props {
  data: ContractData
}

export default function ({ data }: Props) {

  const state = get_state(data)

  return (
    <Stack>
      <SegmentedControl
        readOnly 
        fullWidth
        data  = {[ 'Canceled', 'Activated', 'Closed', 'Spent', 'Settled' ]}
        value = {state}
      />
      <DateTimePicker
        readOnly
        label="Created At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.created_at)}
      />
      <DateTimePicker
        readOnly
        label="Activated At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.active_at)}
      />
      <DateTimePicker
        readOnly
        label="Closed At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.closed_at)}
      />
      <DateTimePicker
        readOnly
        label="Spent At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.spent_at)}
      />
      <DateTimePicker
        readOnly
        label="Settled At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.settled_at)}
      />
      <DateTimePicker
        readOnly
        label="Deadline At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.deadline_at)}
      />
      <DateTimePicker
        readOnly
        label="Expires At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.expires_at)}
      />
      <DateTimePicker
        readOnly
        label="Canceled At"
        valueFormat="MMM DD, YYYY - hh:mm A"
        value={format_date(data.canceled_at)}
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
