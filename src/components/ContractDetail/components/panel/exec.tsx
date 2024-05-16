import { ContractData } from '@scrow/sdk/core'
import { Stack }        from '@mantine/core'

import HashInput from '@/components/ui/HashInput'
import DataInput from '@/components/ui/DataInput'

interface Props {
  data: ContractData
}

export default function ({ data }: Props) {

  return (
    <Stack>
      <DataInput
        label="Script Engine"
        description="The script interpreter used by the virtual machine."
        value={data.terms.engine}
      />
      <HashInput
        label="Machine Id"
        description="The hash identifier of the virtual machine."
        value={data.engine_vmid}
      />
      <HashInput
        label="Final Commit"
        description="The head of the hash-chain for the virtual machine."
        value={data.engine_head ?? 'N/A'}
      />
      <DataInput
        label="Final Output"
        description="The final output of the virtual machine."
        value={data.engine_vout ?? 'N/A'}
      />
    </Stack>
  )
}

