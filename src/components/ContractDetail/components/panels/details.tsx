import { ContractData } from '@scrow/core'

import {
  Divider,
  TextInput,
  Text,
} from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  return (
    <div style={{marginTop: '30px'}}>
        <Text size='lg' fw={700}>Contract Information</Text>
        <Text size='sm' mb={30} c={'dimmed'}>Details and metadata of a contract. you can add paths, payment paths, and programs to it before publishing for review.</Text>
        <TextInput label="Agent ID" value={data.agent_id} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Agent Public Key" value={data.agent_pk} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Agent PN" value={data.agent_pn} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Moderator" value={data.moderator ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
        <Divider mb={40} mt={70} />
    </div>
  )
}
