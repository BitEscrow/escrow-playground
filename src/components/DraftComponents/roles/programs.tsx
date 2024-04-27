import { useForm }        from '@mantine/form'
import { PolicyStore }    from '@scrow/hooks/draft'
import * as util          from '@/lib/draft.js'
import { get_vm_engine }  from '@/lib/vms'
import NoData             from '@/components/ui/NoData'

import { IconPlus, IconTrash } from '@tabler/icons-react'

import {
  Box,
  Button,
  Fieldset,
  TextInput,
  Group,
  ActionIcon,
  Text,
  NumberInput,
  Table
} from '@mantine/core'


interface Props {
  policy : PolicyStore
}

export default function ({ policy } : Props) {
  const draft = policy._draft
  const prop  = draft.proposal
  const vm    = get_vm_engine(prop.data.engine)

  const is_create = window.location.pathname === '/draft/new'

  const rows = policy.data.programs.map((elem, idx) => {
    const [ method, actions, paths, thold ] = elem
    return (
      <Fieldset variant="filled" legend={util.format_method_name(method)} mb={15} key={elem.toString()}>
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Actions</Table.Th>
              <Table.Th>Paths</Table.Th>
              <Table.Th>Threshold</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr key={elem.toString()}>
              <Table.Td>{actions}</Table.Td>
              <Table.Td>{paths}</Table.Td>
              <Table.Td>{thold}</Table.Td>
              { is_create && 
                <Table.Td>
                  <ActionIcon color="red" onClick={() => policy.program.rem(idx) }>
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </Table.Td>
              }
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Fieldset>
    )
  })

  
  const form = useForm({
    mode : 'uncontrolled',
    initialValues : {
      method    : 'endorse',
      actions   : undefined,
      paths     : undefined,
      threshold : 1
    },
    validateInputOnChange : true,
    validate : {
      method  : util.validate_method(vm.methods),
      actions : util.validate_actions(vm.actions),
      paths   : util.validate_paths(draft.pnames)
    }
  })

  const submit = () => {
    const { method, actions, paths, threshold } = form.getValues()
    const program = [ method, actions, paths, threshold ]
    form.validate()
    try {
      if (form.isValid()) {
        policy.program.add(program as any)
      }
    } catch (err) {
      throw new Error('invalid program entry')
    }
  }

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A program is used to call methods within the contract's virtual machine. Each program specifies a set of actions that can be taken, which spending paths can be selected, and which members can execute the program.
      </Text>

      {rows.length === 0 && <NoData>no program interfaces have been defined</NoData>}

      {rows.length !== 0 && rows}

      { is_create && 
        <Fieldset legend="Add Program Interface">
          <Group align="flex-start">
            <TextInput
              label="Method"
              description="The method called within the VM."
              {...form.getInputProps('method')}
            />
            <TextInput
              label="Actions"
              description="Defines which actions are allowed."
              placeholder='enter a basic regex string'
              {...form.getInputProps('actions')}
            />
            <TextInput
              label="Paths"
              description="Defines which paths are allowed."
              placeholder='enter a basic regex string'
              {...form.getInputProps('paths')}
            />    
            <NumberInput
              label="Threshold"
              description="Required # of signatures to activate."
              min={1}
              {...form.getInputProps('threshold')}
            />
          </Group>
          <Button
            variant='subtle'
            mt={15}
            leftSection={<IconPlus size={'14px'}/>}
            style={{borderRadius: '15px', color: '#0068FD' }}
            onClick={submit}
          >
            Add Interface
          </Button>
        </Fieldset>
      }
    </Box>
  )
}
