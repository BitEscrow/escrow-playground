import { useForm }       from '@mantine/form'
import { get_vm_engine } from '@/lib/vms'
import { DraftStore }    from '@scrow/hooks'
import * as util         from '@/lib/draft.js'

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
  Table,
  NativeSelect
} from '@mantine/core'

import NoData      from '@/components/ui/NoData'
import PubkeyInput from '@/components/ui/PubkeyInput'
import { ProgramEntry } from '@scrow/sdk'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  const prop = draft.proposal
  const vm   = get_vm_engine(prop.data.engine)

  const rows = prop.data.programs.map((elem, idx) => {
    const [ method, actions, paths, thold, ...rest ] = elem
    const pubkeys = rest.map(e => String(e))
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
        <PubkeyInput
          label={<Text size='sm' fw={700}>Member Pubkeys</Text>}
          splitChars={[' ', ',']}
          description="List of pubkeys allowed to participate."
          placeholder={pubkeys.length === 0 
            ? 'enter a list of pubkeys' 
            : ''
          }
          value={pubkeys}
          onChange={(e) => update_prog_pubs(e, idx)}
          onClickAdd={(pub) => add_pubkey(pub, idx)}
          error={util.validate_pubkeys(pubkeys)}
        />
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

  const update_prog_pubs = (pubs : string[], idx : number) => {
    const current = prop.data.programs
    const program  = [ ...current[idx].slice(0, 4), ...pubs.sort() ] as ProgramEntry
    const programs  = [
      ...current.slice(0, idx),
      program,
      ...current.slice(idx + 1)
    ]
    return prop.update({ programs })
  }

  const add_pubkey = (pub : string, idx : number) => {
    const current = prop.data.programs
    const program = [ ...current[idx], pub ] as ProgramEntry
    const programs = [
      ...current.slice(0, idx),
      program,
      ...current.slice(idx + 1)
    ]
    return prop.update({ programs })
  }

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
        A program is used to call methods within the contract's virtual machine. Each program specifies a set of actions that can be taken, which spending paths can be selected, and which members can execute the program.
      </Text>

      {rows.length === 0 && <NoData>no program interfaces have been defined</NoData>}

      {rows.length !== 0 && rows}

      <Fieldset legend="Add Program Interface" mb={10}>
        <Group align="flex-start">
          <NativeSelect
            label="Method"
            description="The method called within the VM."
            data={vm.methods}
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
            description="Required # of signatures to execute."
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
    </Box>
  )
}
