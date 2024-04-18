import { EscrowSigner }   from '@scrow/sdk/client'
import { useDepositList } from '@scrow/hooks/deposit'

import {
    Center,
    Text,
    Loader
} from '@mantine/core'

import DepositTable from './table'
import { useClient } from '@scrow/hooks';

interface Props {
  signer: EscrowSigner;
}

export default function Index({ signer }: Props) {
  const { client }          = useClient()
  const { data, isLoading } = useDepositList(client, signer)

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
