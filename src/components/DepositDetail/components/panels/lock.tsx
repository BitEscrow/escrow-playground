import { DepositData }     from '@scrow/sdk/core'
import { Stack, Fieldset } from '@mantine/core'
import { format_label }    from '@/lib/draft'

import HashInput from '@/components/ui/HashInput'

interface Props {
  data: DepositData
}

export default function ({ data } : Props) {
  return (
    <Stack>
      <HashInput
        label="Contract Id"
        description="The hash identifier of the contract."
        value={data.covenant?.cid ?? null}
      />
      <HashInput
        label="Covenant Id"
        description="The hash identifier of the covenant."
        value={data.covenant?.cvid ?? null}
      />
      <HashInput
        label="Deposit Root Pubnonce"
        description="The root public nonce of the depositor."
        value={data.covenant?.pnonce ?? null}
      />
      <Fieldset legend="Partial Signatures">
        { data.covenant && data.covenant.psigs.map(e => (
          <HashInput label={format_label(e[0])} value={e[1]} />
        ))}
      </Fieldset>
    </Stack>
  )
}
