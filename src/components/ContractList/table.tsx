import { EscrowSigner } from '@scrow/sdk/client';
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
import { ContractData } from '@scrow/sdk/core';
import styles from './styles.module.sass'
import { useClient } from '@scrow/hooks';


interface Props {
  signer: EscrowSigner;
}

export default function ContractTable({ signer }: Props) {
  const { client }          = useClient()
  const { data, isLoading } = useContractList(client, signer);
  const navigate = useNavigate();

  const renderProgressBar = (contractData: ContractData) => {
    const pendingPercentage = contractData.fund_pend > 0 ? Math.min((contractData.fund_pend / contractData.tx_total) * 100, 100) : 0;
    const balancePercentage = contractData.fund_value > 0 ? Math.min((contractData.fund_value / contractData.tx_total) * 100, 100) : 100 - pendingPercentage;
    
    return (
      <Progress value={balancePercentage + pendingPercentage}>
        <Tooltip label={`Pending: ${contractData.fund_pend} sats`} color="orange" withinPortal>
          <Progress.Section value={pendingPercentage} color="orange" />
        </Tooltip>
        <Tooltip label={`Secured: ${contractData.fund_value} sats`} color="#3F8C4F" withinPortal>
          <Progress.Section value={balancePercentage} color="#3F8C4F" />
        </Tooltip>
      </Progress>
    );
  };

  if (isLoading) {
    return <Center><Loader color="#0068FD" /></Center>;
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
              <td>{contract.tx_total} sats</td>
              <td>{new Date(contract.updated_at * 1000).toLocaleString()}</td>
              <td>{renderProgressBar(contract)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
