import { ContractData } from '@scrow/sdk/core';
import { NumberInput, TextInput, Text } from '@mantine/core';

interface Props {
  data: ContractData;
}

export default function TransactionDetails({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Transaction Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Key transaction metrics and statuses. This section provides insights into transaction sizes, settlement, and spending details.
      </Text>
      
      {/* Displaying Transaction Details */}
      <NumberInput 
        label="Output Size" 
        value={data.tx_bsize ?? undefined} 
        readOnly 
        style={{ maxWidth: '500px' }} 
      />
      <NumberInput 
        label="Transaction Size" 
        value={data.tx_vsize ?? undefined} 
        readOnly 
        style={{ maxWidth: '500px' }} 
      />
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
