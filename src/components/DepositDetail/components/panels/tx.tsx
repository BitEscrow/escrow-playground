import { DepositData } from '@scrow/core';
import { Divider, TextInput, NumberInput, Text } from '@mantine/core';

interface Props {
  data: DepositData;
}

export default function TransactionDetails({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Transaction Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Overview of transaction states, including settlement and spending details. This section provides insights into the transaction's lifecycle and outcomes.
      </Text>
      
      <TextInput
        label="Settled"
        value={data.settled?.toString() ?? 'N/A'}
        readOnly
        style={{ maxWidth: '500px' }}
      />
      <NumberInput
        label="Settled At"
        value={data.settled_at ?? undefined}
        readOnly
        style={{ maxWidth: '500px' }}
      />
      <TextInput
        label="Spent"
        value={data.spent?.toString() ?? 'N/A'}
        readOnly
        style={{ maxWidth: '500px' }}
      />
      <NumberInput
        label="Spent At"
        value={data.spent_at ?? undefined}
        readOnly
        style={{ maxWidth: '500px' }}
      />
      <TextInput
        label="Spent TXID"
        value={data.spent_txid ?? 'N/A'}
        readOnly
        style={{ maxWidth: '500px' }}
      />

    </div>
  );
}
