import { useDraftStore }    from '@/hooks/useDraft'
import { useForm }          from '@mantine/form'
import { get_vm_engine }    from '@/lib/vms'

import { IconPlus, IconTrash } from '@tabler/icons-react'

import * as util from '@/lib/draft.js'

import {
  Box,
  Button,
  Fieldset,
  TagsInput,
  TextInput,
  Group,
  ActionIcon,
  Text,
  NumberInput,
  Table
} from '@mantine/core'

export default function () {

  const draft = useDraftStore()
  const prop  = draft.proposal
  const vm    = get_vm_engine(prop.data.engine)

  const rows = prop.data.programs.map((elem, idx) => {
    const [ method, actions, paths, thold, ...pubkeys ] = elem
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
              <Table.Td>
                <ActionIcon color="red" onClick={() => prop.program.rem(idx) }>
                  <IconTrash size="1rem" />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <TagsInput readOnly label="Allowed Pubkeys" value={pubkeys.map(e => String(e))} />
      </Fieldset>
    )
  })

  const form = useForm({
    mode : 'uncontrolled',
    initialValues : {
      method    : 'endorse',
      actions   : undefined,
      paths     : undefined,
      threshold : 1,
      pubkeys   : [] as string[]
    },
    validateInputOnChange : true,
    validate : {
      method  : util.validate_method(vm.methods),
      actions : util.validate_actions(vm.actions),
      paths   : util.validate_paths(draft.pnames),
      pubkeys : util.validate_pubkeys
    }
  })

  const submit = () => {
    const { method, actions, paths, threshold, pubkeys } = form.getValues()
    const program = [ method, actions, paths, threshold, ...pubkeys ]
    form.validate()
    try {
      if (form.isValid()) {
        prop.program.add(program)
      }
    } catch (err) {
      throw new Error('invalid program entry')
    }
  }

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A program is used to execute an action within the contract. Each program specifies a set of actions that can be taken, and which spending paths can be selected.
      </Text>

      {rows.length === 0 && <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no program interfaces have been defined</Text>}

      {rows.length !== 0 && rows}

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
          <TagsInput
            label="Pubkeys"
            splitChars={[' ', ',']}
            description="Pubkeys allowed to submit signatures."
            placeholder='enter a list of pubkeys'
            {...form.getInputProps('pubkeys')}
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
    </Box>
  )
}
