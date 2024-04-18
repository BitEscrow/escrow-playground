import { Dispatch, SetStateAction } from 'react'
import { useForm }                  from '@mantine/form'
import { IconPlus, IconTrash }      from '@tabler/icons-react'
import { ScheduleEntry }            from '@scrow/sdk/core'
import { DraftSession }             from '@scrow/sdk/client'

import {
  NumberInput,
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  Code,
  Space,
} from '@mantine/core'

interface Props {
  data    : DraftSession
  setData : Dispatch<SetStateAction<DraftSession>>
}

export default function ({ data, setData } : Props) {

  const proposal = data.proposal

  const form = useForm({
    initialValues: {
      timer   : 0,
      actions : '',
      paths   : ''
    }
  })

  function add_task (task : ScheduleEntry) {
    const schedule = [ ...proposal.schedule, task ]
    setData({ ...data, proposal : { ...proposal, schedule }})
  }

  function rem_task (idx : number) {
    const schedule = [ ...proposal.schedule.slice(0, idx), ...proposal.schedule.slice(idx + 1) ]
    setData({ ...data, proposal : { ...proposal, schedule }})
  }

  const schedule = proposal.schedule.map((itm, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(itm)}</Code>
      <ActionIcon color="red" onClick={() => rem_task(idx) }>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ))

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A task is a program that executes after a scheduled amount of time has elapsed (in seconds). Tasks are useful for automating certain actions within a contract, such as a default settlement. The timer starts when a contract is activated.
        <br /><br />
        You can specify multiple actions and paths for each task. Each combination will be executed from left-to-right. Invalid options will be skipped.
      </Text>

      {schedule.length !== 0 && schedule || <Text mb={30} ml={30} c='dimmed' size='sm'>no tasks have been scheduled</Text>}

      <Group mt="sm">
        <NumberInput
          description="Timer countdown (in seconds)"
          {...form.getInputProps('timer')}
        />
        <TextInput
          description="A list of actions to execute (in regex format)"
          placeholder="close|resolve"
          {...form.getInputProps('actions')}
        />
        <TextInput
          description="A list of paths to select (in regex foramt)"
          placeholder="payout|return"
          {...form.getInputProps('paths')}
        />
      </Group>
      <Space h={10}/>
      <Button
        variant='subtle'
        leftSection={<IconPlus size={'14px'}/>}
        style={{borderRadius: '15px', color: '#0068FD' }}
        onClick={() => {
          const { timer, actions, paths } = form.values
          add_task([ timer, actions, paths ])
          form.reset()
        }}
      >
        Add Scheduled Task
      </Button>
    </Box>
  )
}
