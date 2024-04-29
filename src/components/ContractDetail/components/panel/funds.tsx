import { ContractData } from '@scrow/sdk/core'
import { Stack }        from '@mantine/core'

import DataInput from '@/components/ui/DataInput'
import SatsInput from '@/components/ui/SatsInput'

interface Props {
  data: ContractData;
}

export default function ContractFunds({ data }: Props) {
  return (
    <Stack>
      <DataInput
        label="Deposit Count"
        description="The number of deposits locked to the contract."
        value={data.fund_count}
      />
      <SatsInput
        label="Deposit Fee"
        description="The fee for adding a deposit to the transaction."
        value={data.fund_txfee}
      />
      <SatsInput
        label="Feerate"
        description="The feerate used (in sats/vbyte) for calculating transaction cost."
        value={data.feerate}
      />
      <SatsInput
        label="Pending Funds"
        description="The value of funds that are waiting to be confirmed in a block."
        value={data.fund_pend}
      />
      <SatsInput
        label="Secured Funds"
        description="The value of funds that have been confirmed in a block."
        value={data.fund_value}
      />
    </Stack>
  )
}
