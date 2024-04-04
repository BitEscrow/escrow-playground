import { ContractData } from '@scrow/core';
import { Text, TextInput, Divider } from '@mantine/core';

interface Props {
  data: ContractData; 
}

export default function StatementsDetails({ data }: Props) {
//   const statementDate = data.statement_date ? new Date(data.statement_date * 1000).toLocaleDateString() : 'N/A';
//   const statementDescription = data.statement_description ?? 'N/A';
//   const statementValue = data.statement_value?.toString() ?? 'N/A'; // Assuming statement_value is a numeric field
//   const statementStatus = data.statement_status ?? 'N/A';

  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Statements</Text>
      <Text size="sm" mb={30} color={'dimmed'}>
        Detailed records of financial statements related to the contract. This section includes dates, descriptions, values, and status of each statement for comprehensive financial tracking.
      </Text>
      
          <TextInput label="Statement Date"
            //   value={statementDate}
              readOnly style={{ maxWidth: '500px' }} />
      {/* <TextInput label="Description" value={statementDescription} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Value" value={statementValue} readOnly style={{ maxWidth: '500px' }} />
      <TextInput label="Status" value={statementStatus} readOnly style={{ maxWidth: '500px' }} /> */}

      <Divider mb={40} mt={70} />
    </div>
  );
}
