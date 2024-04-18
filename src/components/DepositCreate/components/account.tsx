import { Text, TextInput } from '@mantine/core'


export default function AccountDetails() {

  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Account Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Overview of the account associated with the contract, including account ID, status, balance, and last activity date. This section provides essential account-specific information for reference and record-keeping.
      </Text>
      
      <TextInput label="Filler Title" style={{ maxWidth: '500px' }} />
      <TextInput label="Filler Title" style={{ maxWidth: '500px' }} />
    </div>
  );
}
