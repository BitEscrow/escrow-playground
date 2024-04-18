import { Dispatch, SetStateAction } from 'react'
import { useForm }                  from '@mantine/form'
import { IconPlus, IconTrash }      from '@tabler/icons-react'
import { PathEntry }                from '@scrow/sdk/core'
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
  Space
} from '@mantine/core'

interface Props {
  data    : DraftSession
  setData : Dispatch<SetStateAction<DraftSession>>
}

export default function ({ data, setData } : Props) {

  const proposal = data.proposal

  const form = useForm({
    initialValues: {
      path    : '',
      value   : 540,
      address : ''
    }
  })

  function add_path (path : PathEntry) {
    const paths = [ ...proposal.paths, path ]
    setData({ ...data, proposal : { ...proposal, paths }})
  }

  function rem_path (idx : number) {
    const paths = [ ...proposal.paths.slice(0, idx), ...proposal.paths.slice(idx + 1) ]
    setData({ ...data, proposal : { ...proposal, paths }})
  }

  const paths = proposal.paths.map((itm, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(itm)}</Code>
      <ActionIcon color="red" onClick={() => rem_path(idx) }>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ))

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A spending path represents a conditional payment in a contract. When published, each path is grouped by label and converted into a partially signed transaction. The contract VM can select from these transactions when spending.
      </Text>

      {paths.length !== 0 && paths || <Text mb={30} ml={30} c='dimmed' size='sm'>no spending paths have been created</Text>}

      <Group mt="sm">
        <TextInput
          description="Path Label"
          placeholder="payout"
          {...form.getInputProps('path')}
        />
        <NumberInput
          description="Payment Amount (in sats)"
          {...form.getInputProps('value')}
        />
        <TextInput
          description="Receive Address"
          placeholder="receive address"
          {...form.getInputProps('address')}
        />
      </Group>
      <Space h={10}/>
      <Button
        variant='subtle'
        leftSection={<IconPlus size={'14px'}/>}
        style={{borderRadius: '15px', color: '#0068FD' }}
        onClick={() => {
          const { path, value, address } = form.values
          add_path([ path, value, address ])
          form.reset()
        }}
      >
        Add Spending Path
      </Button>
    </Box>
  )
}
