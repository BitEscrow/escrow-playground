import { useForm }             from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { CoreLib }             from '@scrow/sdk'
import { convert_regex }       from '@/lib/util'
import { get_vm_engine }       from '@/lib/vms'
import { DraftStore }          from '@scrow/hooks'
import NoData                  from '@/components/ui/NoData'

import {
  NumberInput,
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  Space,
  Table,
} from '@mantine/core'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  const prop  = draft.proposal
  const vm    = get_vm_engine(prop.data.engine)

  const form = useForm({
    initialValues: {
      timer   : 7200,
      actions : undefined,
      paths   : undefined
    },
    validateInputOnChange : true,
    validate : {
      timer   : (e) => (e < 1) ? 'invalid timer value' : null,
      actions : (e) => {
        const actions = convert_regex(e, vm.actions)
        if (actions === undefined) return 'action is undefined'
        for (const action of actions) {
          if (!vm.actions.includes(action)) {
            return 'action is not supported in vm: ' + e
          }
        }
        return null
      },
      paths : (e) => {
        const names = CoreLib.proposal.get_path_names(prop.data.paths)
        const paths = convert_regex(e, names)
        if (paths === undefined) return 'path is undefined'
        for (const path of paths) {
          if (!names.includes(path)) {
            return 'path does not exist in proposal: ' + e
          }
        }
        return null
      }
    }
  })

  const rows = prop.data.schedule.map((elem, idx) => {
    const [ timer, actions, paths ] = elem
    return (
      <Table.Tr key={elem.toString()}>
        <Table.Td>{timer}</Table.Td>
        <Table.Td>{actions}</Table.Td>
        <Table.Td>{paths}</Table.Td>
        <Table.Td>
          <ActionIcon color="red" onClick={() => prop.task.rem(idx) }>
            <IconTrash size="1rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  const submit = () => {
    const { timer, actions, paths } = form.getValues()
    const task = [ timer, actions, paths ]
    form.validate()
    try {
      if (form.isValid()) {
        prop.task.add(task)
        form.reset()
      }
    } catch (err) {
      throw new Error('invalid task entry')
    }
  }

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A task is a program that executes after a scheduled amount of time has elapsed (in seconds). Tasks are useful for automating certain actions within a contract, such as a default settlement. The timer starts when a contract is activated.
        <br /><br />
        You can specify multiple actions and paths for each task. Each task item will run from left-to-right. Invalid options will be skipped.
      </Text>

      {rows.length === 0 && <NoData>no tasks have been scheduled</NoData>}

      {rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Timer</Table.Th>
              <Table.Th>Actions</Table.Th>
              <Table.Th>Paths</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }

      <Group mt="sm" align="flex-start">
        <NumberInput
          description="Delay timer (in seconds)."
          {...form.getInputProps('timer')}
          min={1}
        />
        <TextInput
          description="Defines which actions will be taken."
          placeholder="close|resolve"
          {...form.getInputProps('actions')}
        />
        <TextInput
          description="Defines which paths will be selected."
          placeholder="payout|return"
          {...form.getInputProps('paths')}
        />
      </Group>
      <Space h={10}/>
      <Button
        variant='subtle'
        leftSection={<IconPlus size={'14px'}/>}
        style={{borderRadius: '15px', color: '#0068FD' }}
        onClick={submit}
      >
        Add Scheduled Task
      </Button>
    </Box>
  )
}
