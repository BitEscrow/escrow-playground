import { ContractData } from '@scrow/sdk/core';
import { Divider, TextInput, Text } from '@mantine/core';

interface Props {
  data: ContractData;
}

export default function ContractFunds({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Funds</Text>
      <Text size="sm" mb={30} c={'dimmed'}>
        Overview of financials related to the contract. This section displays balances, values, and fees associated with the contract.
      </Text>
      
      <TextInput label="Balance" value={data.fund_value?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="fund_pend Balance" value={data.fund_pend?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Total Value" value={data.tx_total?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Subtotal Value" value={data.subtotal?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Fee Rate" value={data.feerate?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Transaction Fee" value={data.tx_fees?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      
      <Divider mb={40} mt={70} />
    </div>
  );
}
