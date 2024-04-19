import { useForm }             from '@mantine/form'
import { useDraftStore }       from '@/hooks/useDraft'
import { IconPlus, IconTrash } from '@tabler/icons-react'

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

export default function () {

  const draft = useDraftStore()
  const prop  = draft.proposal

  const form = useForm({
    initialValues: {
      timer   : 60 * 60 * 24,
      actions : '*',
      paths   : '*'
    }
  })

  const schedule = prop.data.schedule.map((itm, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(itm)}</Code>
      <ActionIcon color="red" onClick={() => prop.task.rem(idx) }>
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
          prop.task.add([ timer, actions, paths ])
        }}
      >
        Add Scheduled Task
      </Button>
    </Box>
  )
}
