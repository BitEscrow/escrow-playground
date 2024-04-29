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
        label="Return Address"
        description="The return address used for closing or recovering the deposit."
        value={data.return_addr}
      />
      <HashInput
        label="Return Signature"
        description="The depositor's signature for the return transaction."
        value={data.return_psig}
      />
      <HashInput
        label="Recovery Tx"
        description="The transaction hex for the depositor's recovery transaction."
        value={null}
      />
    </Stack>
  )
}
