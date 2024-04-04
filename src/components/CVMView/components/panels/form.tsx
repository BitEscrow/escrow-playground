import { ContractData }             from '@scrow/core';
import { Divider, Select, Text }    from '@mantine/core';

interface Props {
  data: ContractData; // Assuming ContractData includes fields for method, action, and path
}

export default function FormDetails({ data }: Props) {
  // Example placeholder options. Adjust these according to your actual requirements.
  const methodOptions = [
    { value: 'get', label: 'GET' },
    { value: 'post', label: 'POST' },
    { value: 'put', label: 'PUT' },
    { value: 'delete', label: 'DELETE' },
  ];

  const actionOptions = [
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'fetch', label: 'Fetch' },
  ];

  const pathOptions = [
    { value: '/api/v1/resource', label: '/api/v1/resource' },
    { value: '/api/v1/resource/:id', label: '/api/v1/resource/:id' },
    // Add more path options as needed
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <Text size="lg" fw={700}>Form Details</Text>
      <Text size="sm" mb={30} color={'dimmed'}>
        Configure the form's behavior by selecting the method, action, and path.
      </Text>
      
      <Select
        label="Method"
        placeholder="Select method"
        data={methodOptions}
        value={data.method ?? undefined} // Adjust according to actual data structure
        readOnly
        style={{ maxWidth: '500px', marginBottom: '20px' }}
      />
      <Select
        label="Action"
        placeholder="Select action"
        data={actionOptions}
        value={data.action ?? undefined} // Adjust according to actual data structure
        readOnly
        style={{ maxWidth: '500px', marginBottom: '20px' }}
      />
      <Select
        label="Path"
        placeholder="Select path"
        data={pathOptions}
        value={data.path ?? undefined} // Adjust according to actual data structure
        readOnly
        style={{ maxWidth: '500px', marginBottom: '20px' }}
      />

      <Divider mb={40} mt={70} />
    </div>
  );
}
