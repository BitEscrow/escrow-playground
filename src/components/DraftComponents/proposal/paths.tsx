import { useForm }             from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { useDraftStore }       from '@/hooks/useDraft'

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

export default function () {

  const draft = useDraftStore()
  const prop  = draft.proposal

  const form = useForm({
    initialValues: {
      path    : '',
      value   : 540,
      address : ''
    }
  })

  const paths = prop.data.paths.map((itm, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(itm)}</Code>
      <ActionIcon color="red" onClick={() => prop.path.rem(idx) }>
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
          prop.path.add([ path, value, address ])
        }}
      >
        Add Spending Path
      </Button>
    </Box>
  )
}
