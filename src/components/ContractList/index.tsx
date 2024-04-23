import { EscrowSigner } from '@scrow/sdk/client';
import { useContractList } from '@scrow/hooks/contract';
import { Center, Loader, Text } from '@mantine/core';
import ContractTable from './table';
import { useClient } from '@/hooks/useClient'

interface Props {
  signer: EscrowSigner;
}

export default function Home({ signer }: Props) {
  const { client }          = useClient()
  const { data, isLoading } = useContractList(client, signer)

  if (isLoading) {
    return <Center><Loader color="#0068FD" /></Center>;
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
