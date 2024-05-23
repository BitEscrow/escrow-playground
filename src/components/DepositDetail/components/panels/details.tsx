import { DepositData } from '@scrow/sdk/core'
import { Stack }       from '@mantine/core'

import HashInput from '@/components/ui/HashInput'

interface Props {
  data: DepositData
}

export default function ({ data } : Props) {
  return (
    <Stack>
      <HashInput
        label="Account Id"
        description="The hash identifier of the reserved deposit account."
        value={data.account_hash}
      />
      <HashInput
        label="Agent Pubkey"
        description="The public key of the server's signing agent."
        value={data.agent_pk}
      />
      <HashInput
        label="Agent Token"
        description="The server's token for the covenant signing session."
        value={data.agent_tkn}
      />
      <HashInput
        label="Deposit Pubkey"
        description="The public key of the depositor's signing agent."
        value={data.deposit_pk}
      />
    </Stack>
  )
}
