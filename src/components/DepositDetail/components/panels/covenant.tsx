import { DepositData } from '@scrow/core';
import { TextInput, Text, Divider } from '@mantine/core';

interface Props {
  data: DepositData;
}

export default function CovenantDetails({ data }: Props) {
  const cid = data.covenant !== null ? data.covenant.cid : 'N/A';
  const pnonce = data.covenant !== null ? data.covenant.pnonce : 'N/A';
  // const psigs = data.covenant !== null ? data.covenant.psigs.join(", ") : 'N/A';

  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Covenant Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Specifics of the deposit's covenant, detailing the contract ID and deposit nonce used in transactions.
      </Text>
      
      <TextInput label="Contract ID" value={cid} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Deposit Nonce" value={pnonce} readOnly style={{ maxWidth: '500px' }} />
      {/* <TextInput label="Participant Signatures" value={psigs} readOnly style={{ maxWidth: '500px' }} /> */}
      
      <Divider mb={40} mt={70} />
    </div>
  );
}
