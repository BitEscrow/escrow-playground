import { DepositData } from '@scrow/core';
import { Divider, NumberInput, TextInput, Text } from '@mantine/core';

interface Props {
  data: DepositData;
}

export default function DepositDetails({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Deposit Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Overview of the deposit transaction, including transaction ID, output index, value, and script key.
      </Text>
      
      <TextInput label="Transaction ID" value={data.txid ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <NumberInput label="Output Index" value={data.vout ?? undefined} readOnly style={{ maxWidth: '500px' }} />
      <NumberInput label="Value" value={data.value ?? undefined} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="ScriptKey" value={data.scriptkey ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />

      <Divider mb={40} mt={70} />
    </div>
  );
}
