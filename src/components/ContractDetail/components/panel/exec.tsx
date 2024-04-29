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
        label="Engine"
        description="The execution engine used by the virtual machine."
        value={data.terms.engine}
      />
      <HashInput
        label="Virtual Machine Id"
        description="The hash identifier of the virtual machine."
        value={data.vmid}
      />
      <HashInput
        label="Current Head"
        description="The head of the hash-chain for the virtual machine."
        value={data.active_head ?? 'N/A'}
      />
      <DataInput
        label="Closing Output"
        description="The final output of the virtual machine."
        value={data.closed_path ?? 'N/A'}
      />
    </Stack>
  )
}

