import { ContractData }    from '@scrow/sdk/core'
import { Fieldset, Stack } from '@mantine/core'
import { format_label }    from '@/lib/draft'

import DataInput from '@/components/ui/DataInput'
import HashInput from '@/components/ui/HashInput'

interface Props {
  data: ContractData
}

export default function ({ data }: Props) {

  return (
    <Stack>
      <DataInput
        label="Transaction Base Size"
        description="The base size of the transaction (without inputs)."
        value={data.tx_bsize}
      />
      <DataInput
        label="Transaction Virtual Size"
        description="The vsize of the full transaction (in bytes)."
        value={data.tx_vsize ?? undefined}
      />
      <HashInput
        label="Transaction Id"
        description="The txid of the spending transaction of the contract."
        value={data.spent_txid}
      />
      <HashInput
        label="Transaction Hex"
        description="The hexstring of the spending transaction of the contract."
        value={data.spent_txhex}
      />
      <Fieldset my={10} legend="Spending Path Templates">
        {data.outputs.map((e) => (
          <HashInput
            mb     = {10}
            key    = {e[0]}
            label  = {format_label(e[0])}
            value  = {e[1]}
          />
        ))}
      </Fieldset>
    </Stack>
  )
}
