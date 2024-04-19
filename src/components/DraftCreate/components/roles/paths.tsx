import { useForm }             from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { PolicyStore }         from '@scrow/hooks/draft'

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
  policy : PolicyStore
}

export default function ({ policy } : Props) {

  const form = useForm({
    initialValues: {
      path    : '',
      value   : 540,
      address : ''
    }
  })

  const paths = policy.data.paths.map((itm, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(itm)}</Code>
      <ActionIcon color="red" onClick={() => policy.path.rem(idx) }>
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
      </Group>
      <Space h={10}/>
      <Button
        variant='subtle'
        leftSection={<IconPlus size={'14px'}/>}
        style={{borderRadius: '15px', color: '#0068FD' }}
        onClick={() => {
          const { path, value } = form.values
          policy.path.add([ path, value ])
        }}
      >
        Add Spending Path
      </Button>
    </Box>
  )
}
