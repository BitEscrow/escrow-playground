import { DepositData } from '@scrow/sdk/core'
import { Stack }       from '@mantine/core'

import HashInput from '@/components/ui/HashInput'
import SatsInput from '@/components/ui/SatsInput'

interface Props {
  data: DepositData
}

export default function ({ data } : Props) {
  return (
    <Stack>
      <HashInput
        label="Deposit Address"
        description="The on-chain musig address for the deposit."
        value={data.deposit_addr}
      />
      <SatsInput
        label="Deposit Value"
        description="The output value of the deposit (in sats)."
        value={data.utxo.value}
      />
      <HashInput
        label="Satpoint"
        description="The source transaction id and output of the funds."
        value={data.satpoint}
      />
      <HashInput
        label="Script Key"
        description="The taproot script key locking the deposit."
        value={data.utxo.scriptkey}
      />
    </Stack>
  )
}
