import { DepositData } from '@scrow/sdk/core';
import { Text, Divider } from '@mantine/core';

interface Props {
  data: DepositData;
}

export default function ({ data }: Props) {

  console.log(data)

  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Session Details</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Information regarding the session's agent, including identification and public keys. This section outlines the key details necessary for identifying and verifying the agent involved in the session.
      </Text>
      <Divider mb={40} mt={70} />
    </div>
  );
}
