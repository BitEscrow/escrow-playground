import { useForm }             from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { useDraftStore }       from '@/hooks/useDraft'

import * as util from '@/lib/draft.js'

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
  Fieldset
} from '@mantine/core'

export default function () {

  const draft = useDraftStore()
  const prop  = draft.proposal

  const form = useForm({
    initialValues: {
      pathname : '',
      value    : 540,
      address  : ''
    },
    validateInputOnChange : true,
    validate : {
      pathname : util.validate_path,
      value    : util.validate_path_value,
      address  : util.validate_address(prop.data.network)
    }
  })

  const submit = () => {
    const { pathname, value, address } = form.getValues()
    const path = [ pathname, value, address ]
    form.validate()
    try {
      if (form.isValid()) {
        prop.path.add(path)
      }
    } catch (err) {
      throw new Error('invalid path entry')
    }
  }

  const rows = prop.data.paths.map((elem, idx) => {
    const [ pathname, amt, address ] = elem
    return (
      <Table.Tr key={address}>
        <Table.Td>{pathname}</Table.Td>
        <Table.Td>{amt}</Table.Td>
        <Table.Td>{address}</Table.Td>
        <Table.Td>
          <ActionIcon color="red" onClick={() => prop.path.rem(idx) }>
            <IconTrash size="1rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A spending path represents a conditional payment in a contract. When published, each path is grouped by label and converted into a partially signed transaction. The contract VM can select from these transactions when spending.
      </Text>

      {rows.length === 0 && <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no spending paths have been created</Text>}

      {rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Pathname</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Address</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }

      <Fieldset legend="Add Path Output">
        <Group mt="sm" align="flex-start">
          <TextInput
            description="Pathname"
            placeholder="payout"
            {...form.getInputProps('pathname')}
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
          onClick={submit}
        >Add</Button>
      </Fieldset>
    </Box>
  )
}
