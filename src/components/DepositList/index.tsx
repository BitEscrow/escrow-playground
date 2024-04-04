import { EscrowSigner } from '@scrow/core';
import { useDepositList } from '@scrow/hooks/deposit';
import {
    Center,
    Text,
    Loader
} from '@mantine/core';

import DepositTable from './table';

interface Props {
  signer: EscrowSigner;
}

export default function Index({ signer }: Props) {
  const { data, isLoading } = useDepositList(signer);

  if (isLoading) {
    return <Center><Loader color="#0068FD" /></Center>;
  }

  if (data.length === 0) {
    return (
      <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
        <Text c="dimmed">You have no known deposits.</Text>
      </Center>
    );
  }


  return <DepositTable signer={signer} />;
}
