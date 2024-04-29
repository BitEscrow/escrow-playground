import { ContractData }    from '@scrow/sdk/core'
import { Fieldset, Stack } from '@mantine/core'

import DataInput from '@/components/ui/DataInput'
import HashInput from '@/components/ui/HashInput'
import StampInput from '@/components/ui/StampInput'

interface Props {
  data: ContractData
}

export default function ({ data }: Props) {

  return (
    <Stack>
      <HashInput
        label="Proposal Id"
        description="The hash identifier of the original proposal."
        value={data.prop_id}
      />
      <StampInput
        label="Created At"
        description="The timestamp for when the proposal was created."
        value={data.terms.created_at}
      />
      <DataInput
        label="Funding Deadline"
        description="The max duration (in seconds) for collecting deposits."
        value={data.terms.deadline}
      />
      <DataInput
        label="Contract Duration"
        description="The max duration (in seconds) of the contract."
        value={data.terms.duration}
      />
      <DataInput
        label="Deposit Timeout"
        description="The max duration (in seconds) that deposits may be unconfirmed."
        value={data.terms.txtimeout}
      />
      <Fieldset legend="Spending Path Outputs">
        {data.terms.paths.map((e) => (
          <DataInput
            mb     = {10}
            key    = {e.toString()}
            value  = {JSON.stringify(e)}
          />
        ))}
      </Fieldset>
      <Fieldset legend="Payment Outputs">
        {data.terms.payments.map((e) => (
          <DataInput
            mb     = {10}
            key    = {e.toString()}
            value  = {JSON.stringify(e)}
          />
        ))}
      </Fieldset>
      <Fieldset legend="Program Interfaces">
        {data.terms.programs.map((e) => (
          <DataInput
            mb     = {10}
            key    = {e.toString()}
            value  = {JSON.stringify(e)}
          />
        ))}
      </Fieldset>
      <Fieldset legend="Scheduled Tasks">
        {data.terms.schedule.map((e) => (
          <DataInput
            mb     = {10}
            key    = {e.toString()}
            value  = {JSON.stringify(e)}
          />
        ))}
      </Fieldset>
      <DataInput
        label="Protocol Version"
        description="The version of the contract protocol."
        value={data.terms.version}
      />
    </Stack>
  )
}
