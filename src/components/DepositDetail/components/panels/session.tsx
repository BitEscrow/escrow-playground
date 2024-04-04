import { DepositData } from '@scrow/core';
import { Text, TextInput, Divider } from '@mantine/core';

interface Props {
  data: DepositData;
}

export default function SessionDetails({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Session Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Information regarding the session's agent, including identification and public keys. This section outlines the key details necessary for identifying and verifying the agent involved in the session.
      </Text>
      
      <TextInput label="Agent ID" value={data.agent_id ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Agent Pubkey" value={data.agent_pk ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Agent PN" value={data.agent_pn ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />

      <Divider mb={40} mt={70} />
    </div>
  );
}
