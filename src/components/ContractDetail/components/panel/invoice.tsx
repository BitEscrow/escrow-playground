import { ContractData } from '@scrow/sdk/core'
import { Stack }        from '@mantine/core'

import SatsInput from '@/components/ui/SatsInput'

interface Props {
  data: ContractData
}

export default function ContractFunds({ data }: Props) {
  return (
    <Stack>
      <SatsInput
        label="Contract Value"
        description="The value of the underlying contract."
        value={data.terms.value}
      />
      <SatsInput
        label="Provider Fees"
        description="The fees charged by the server provider."
        value={data.fees.reduce((p, c) => p + c[0], 0)}
      />
      <SatsInput
        label="Subtotal"
        description="The value of the contract, plus provider fees."
        value={data.subtotal}
      />
      <SatsInput
        label="Transaction Fees"
        description="The fees for including the transaction in a block."
        value={data.tx_fees ?? undefined}
      />
      <SatsInput
        label="Transaction Total"
        description="The total transaction value of the contract."
        value={data.tx_total ?? undefined}
      />
    </Stack>
  )
}
