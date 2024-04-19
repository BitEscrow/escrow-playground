import { useDraftStore } from '@/hooks/useDraft'
import { useForm }       from '@mantine/form'
import { IconPlus }      from '@tabler/icons-react'

import { Accordion, Box, Button, Group, Space, Text, TextInput } from '@mantine/core'

import PolicyForm from './roles/policy'

export default function () {

  const draft = useDraftStore()
  const roles = draft.roles
  const form  = useForm({ initialValues : { title : '' }})

  const policies = roles.map(e => <PolicyForm key={e.id} policy={e}/>)

  return (
    <Box>
      {policies.length === 0 && <Text mb={30} ml={30} c='dimmed' size='sm'>no roles have been created</Text>}
      <Accordion mt="xs">{policies}</Accordion>
      <Space h={10}/>
      <Group>
        <TextInput
          description="Enter a name for the role."
          {...form.getInputProps('title')}
        />
        <Space h={10}/>
        <Button
          variant='subtle'
          leftSection={<IconPlus size={'14px'}/>}
          style={{ borderRadius: '15px', color: '#0068FD', alignSelf: 'end' }}
          onClick={() => {
            draft.role.add(form.values)
          }}
        >
          Create Role
        </Button>
      </Group>
    </Box>
  )
}
