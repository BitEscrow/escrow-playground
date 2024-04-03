import { ContractData } from '@scrow/core';
import {
  Text,
  TextInput,
  Divider
} from '@mantine/core';

interface Props {
  data: ContractData;
}

export default function TermsDetails({ data }: Props) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Terms Details</Text>
      <Text size="sm" mb={30} color={'dimmed'}>
        Specific terms and conditions of the contract. This section outlines the agreement proposal ID.
      </Text>
      
      <TextInput 
        label="Proposal ID" 
        value={data.prop_id ?? 'N/A'} 
        readOnly 
        style={{ maxWidth: '500px' }} 
      />

      <Divider mb={40} mt={70} />
    </div>
  );
}
