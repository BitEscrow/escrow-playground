import { ContractData }       from '@scrow/sdk/core'
import { Stack, NumberInput } from '@mantine/core'

interface Props {
  data: ContractData
}

export default function ContractFunds({ data }: Props) {
  return (
    <Stack>
      <NumberInput
        readOnly
        label="Contract Value"
        value={data.terms.value}
        suffix=' sats'
        thousandSeparator
      />
      <NumberInput
        readOnly
        label="Provider Fees"
        value={data.fees.reduce((p, c) => p + c[0], 0)}
        suffix=' sats'
        thousandSeparator
      />
      <NumberInput
        readOnly
        label="Subtotal"
        value={data.subtotal}
        suffix=' sats'
        thousandSeparator
      />
      <NumberInput
        readOnly
        label="Transaction Fees"
        value={data.tx_fees}
        suffix=' sats'
        thousandSeparator
      />
      <NumberInput
        readOnly
        label="Transaction Total"
        value={data.tx_total}
        suffix=' sats'
        thousandSeparator
      />
    </Stack>
  )
}
