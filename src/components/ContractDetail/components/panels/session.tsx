import { ContractData } from '@scrow/sdk/core';
import { Divider, TextInput, Text } from '@mantine/core';

interface Props {
  data: ContractData;
}

export default function SessionDetails({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Session Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Information about the session agent, public keys, and moderator. These details are crucial for the integrity and security of the contract session.
      </Text>
    
      <TextInput label="Moderator" value={data.moderator ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      
      <Divider mb={40} mt={70} />
    </div>
  );
}
