import { DraftStore } from '@scrow/hooks'
import { useForm }    from '@mantine/form'
import { IconPlus }   from '@tabler/icons-react'

import { Accordion, Box, Button, Fieldset, Group, Text, TextInput } from '@mantine/core'

import PolicyForm from './roles/policy'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  const roles = draft.roles
  const form  = useForm({ initialValues : { title : '' }})

  const policies = roles.map(e => <PolicyForm key={e.id} policy={e}/>)

  const is_create = window.location.pathname === '/draft/new'

  return (
    <Box mb={20}>
      {policies.length === 0 && <Text mb={30} ml={30} c='dimmed' size='sm'>no roles have been created</Text>}
      <Accordion mt="xs">{policies}</Accordion>
      { is_create &&
        <Fieldset legend="New Policy">
          <Group>
            <TextInput
              description="Enter a name for the policy."
              {...form.getInputProps('title')}
            />
            <Button
              variant='subtle'
              leftSection={<IconPlus size={'14px'}/>}
              style={{ borderRadius: '15px', color: '#0068FD', alignSelf: 'end' }}
              onClick={() => { draft.role.add(form.values) }}
            >
              Create Policy
            </Button>
          </Group>
        </Fieldset>
      }
    </Box>
  )
}
