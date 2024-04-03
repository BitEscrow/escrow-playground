import { EscrowSigner } from '@scrow/core/client';
import { useContractList } from '@scrow/hooks/contract';
import { Center, Loader, Text } from '@mantine/core';
import ContractTable from './components/table';

interface Props {
  signer: EscrowSigner;
}

export default function Home({ signer }: Props) {
  const { data, isLoading } = useContractList(signer);

  if (isLoading) {
    return <Center><Loader color="blue" /></Center>;
  }

  if (data?.length === 0) {
    return (
      <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
        <Text c="dimmed">You have no known contracts.</Text>
      </Center>
    );
  }

  return <ContractTable signer={signer} />;
}
