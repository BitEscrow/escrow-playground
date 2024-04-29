import { DepositData } from '@scrow/sdk/core'
import { Stack }       from '@mantine/core'

import HashInput  from '@/components/ui/HashInput'
import StampInput from '@/components/ui/StampInput'
import DataInput  from '@/components/ui/DataInput'

interface Props {
  data: DepositData
}

export default function ({ data } : Props) {
  return (
    <Stack>
      <HashInput
        label="Block Hash"
        description="The hash of the confirming block."
        value={data.block_hash ?? 'N/A'}
      />
      <DataInput
        label="Block Height"
        description="The height of the confirming block."
        value={data.block_height ?? 'N/A'}
      />
      <StampInput
        label="Block Timestamp"
        description="The timestamp of the confirming block."
        value={data.block_time}
      />
      <HashInput
        label="Spend Transaction Id"
        description="The txid of the spending transaction."
        value={data.spent_txid  ?? 'N/A'}
      />
      <HashInput
        label="Spend Transaction Hex"
        description="The hex data of the spending transaction."
        value={data.spent_txhex ?? 'N/A'}
      />
    </Stack>
  )
}
