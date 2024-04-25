import { ContractData } from '@scrow/sdk/core'

import { Stack, NumberInput } from '@mantine/core'

interface Props {
  data: ContractData;
}

export default function ContractFunds({ data }: Props) {
  return (
    <Stack>
      <NumberInput
        readOnly
        label="Deposit Count"
        value={data.fund_count}
      />
      <NumberInput
        readOnly
        label="Deposit Tx Fee"
        value={data.fund_txfee}
        suffix=' sats'
        thousandSeparator
      />
      <NumberInput
        readOnly
        label="Feerate"
        value={data.feerate}
        suffix=' sats/vb'
      />
      <NumberInput
        readOnly
        label="Pending Funds"
        value={data.fund_pend}
        suffix=' sats'
        thousandSeparator
      />
      <NumberInput
        readOnly
        label="Secured Funds"
        value={data.fund_value}
        suffix=' sats'
        thousandSeparator
      />
    </Stack>
  )
}
