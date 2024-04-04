import { DepositData } from '@scrow/core';
import { TextInput, Text, Divider } from '@mantine/core';

interface Props {
  data: DepositData;
}

export default function ConfirmationDetails({ data }: Props) {
  const confirm_at = data.confirmed
    ? new Date(data.block_time * 1000).toLocaleString()
    : 'N/A';

  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Confirmation Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Information related to the confirmation status of the deposit. This section provides a snapshot of the deposit's confirmation on the blockchain.
      </Text>
      
      <TextInput label="Confirmed" value={data.confirmed.toString()} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Confirmed At" value={confirm_at} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Block Hash" value={data.block_hash ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Block Height" value={data.block_height?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      
      <Divider mb={40} mt={70} />
    </div>
  );
}
