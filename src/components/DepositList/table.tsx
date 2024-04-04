import { EscrowSigner } from '@scrow/core';
import { useDepositList } from '@scrow/hooks/deposit';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Paper,
  Center,
  Text,
  Progress,
  Tooltip,
  ActionIcon,
  Loader
} from '@mantine/core';
import { IconZoomScan } from '@tabler/icons-react';
import { DepositData } from '@scrow/core';
import styles from './styles.module.sass'; // Ensure this path is correct

interface Props {
  signer: EscrowSigner;
}

export default function DepositTable({ signer }: Props) {
  const { data, isLoading } = useDepositList(signer);
  const navigate = useNavigate();

  const renderProgressBar = (depositData: DepositData) => {
    // Assuming get_progress function is correctly imported or defined within this file
    const progress = depositData.expires_at ? get_progress(depositData.created_at, depositData.expires_at) : 0;
    const color = progress < 50 ? '#3F8C4F' : progress < 75 ? 'yellow' : progress < 90 ? 'orange' : 'red';

    return (
      <Progress value={progress} color={color}>
        <Tooltip label={`Expires at: ${new Date(depositData.expires_at * 1000).toLocaleString()}`} color={color} withinPortal>
          <Progress.Section value={progress} color={color} />
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
        <Text color="dimmed">You have no known deposits.</Text>
      </Center>
    );
  }

  return (
    <Paper>
      <Table>
        <thead>
          <tr>
             <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>View</th>
             <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>TxID</th>
             <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Status</th>
             <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Value</th>
             <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Expires At</th>
             <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((deposit) => (
            <tr key={deposit.dpid} className={styles.tableRow}>
              <td>
                <ActionIcon
                  variant="subtle"
                  onClick={() => navigate(`/deposits/${deposit.dpid}`)}
                >
                  <IconZoomScan size={16} color='#0068FE'/>
                </ActionIcon>
              </td>
              <td>{deposit.txid}</td>
              <td>{deposit.status}</td>
              <td>{deposit.value} sats</td>
              <td>{deposit.expires_at ? new Date(deposit.expires_at * 1000).toLocaleString() : 'Unconfirmed'}</td>
              <td>{renderProgressBar(deposit)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

function get_progress(created_at: number, expires_at: number) {
  const current = Date.now() / 1000; // Assuming now() returns seconds since epoch, adjust as necessary
  if (expires_at <= current) return 100;
  const total = expires_at - created_at;
  const elapsed = current - created_at;
  const percent = (elapsed / total) * 100;
  return Math.floor(Math.max(0, Math.min(100, 100 - percent)));
}
