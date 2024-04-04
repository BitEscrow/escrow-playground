import { ContractData } from '@scrow/core';
import { Text, TextInput, Divider } from '@mantine/core';

interface Props {
  data: ContractData;
}

export default function HistoryDetails({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>History</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        A record of key identities involved in the contract's history, including agent and moderator information. This section outlines the principal parties for transparency and accountability.
      </Text>
      
      <TextInput label="Agent ID" value={data.agent_id ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Agent Public Key" value={data.agent_pk ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Agent PN" value={data.agent_pn ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Moderator" value={data.moderator ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />

      <Divider mb={40} mt={70} />
    </div>
  );
}
