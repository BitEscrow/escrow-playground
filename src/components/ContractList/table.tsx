import { EscrowSigner } from '@scrow/core/client';
import { useContractList } from '@scrow/hooks/contract';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Paper,
  Center,
  Text,
  Progress,
  Tooltip,
  // Button,
  ActionIcon, 
  Loader
} from '@mantine/core';

import { IconZoomScan } from '@tabler/icons-react';
import { ContractData } from '@scrow/core';
import styles from './styles.module.sass'


interface Props {
  signer: EscrowSigner;
}

export default function ContractTable({ signer }: Props) {
  const { data, isLoading } = useContractList(signer);
  const navigate = useNavigate();

  const renderProgressBar = (contractData: ContractData) => {
    const pendingPercentage = contractData.pending > 0 ? Math.min((contractData.pending / contractData.total) * 100, 100) : 0;
    const balancePercentage = contractData.balance > 0 ? Math.min((contractData.balance / contractData.total) * 100, 100) : 100 - pendingPercentage;
    
    return (
      <Progress value={balancePercentage + pendingPercentage}>
        <Tooltip label={`Pending: ${contractData.pending} sats`} color="orange" withinPortal>
          <Progress.Section value={pendingPercentage} color="orange" />
        </Tooltip>
        <Tooltip label={`Secured: ${contractData.balance} sats`} color="green" withinPortal>
          <Progress.Section value={balancePercentage} color="green" />
        </Tooltip>
      </Progress>
    );
  };

  if (isLoading) {
    return <Center><Loader color="blue" /></Center>;
  }

  if (data.length === 0) {
    return (
      <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
        <Text c="dimmed">You have no known contracts.</Text>
      </Center>
    );
  }

  return (
    <Paper>
      <Table>
        <thead>
          <tr>
            <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>View</th>
            <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Title</th>
            <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Status</th>
            <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Value</th>
            <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Updated At</th>
            <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contract) => (
            <tr key={contract.cid}  className={styles.tableRow}>
              <td>
                <ActionIcon
                  variant="subtle"
                  onClick={() => navigate(`/contracts/${contract.cid}`)}
                >
                  <IconZoomScan size={16} color='#0068FE'/>
                </ActionIcon>
              </td>
              <td>{contract.terms.title}</td>
              <td>{contract.status}</td>
              <td>{contract.total} sats</td>
              <td>{new Date(contract.updated_at * 1000).toLocaleString()}</td>
              <td>{renderProgressBar(contract)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
