import { useForm }             from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { PolicyStore }         from '@scrow/hooks/draft'
import * as util               from '@/lib/draft.js'

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


interface Props {
  policy : PolicyStore
}

export default function ({ policy } : Props) {

  const is_create = window.location.pathname === '/draft/new'

  const form = useForm({
    initialValues: {
      pathname : '',
      value    : 540
    },
    validateInputOnChange : true,
    validate : {
      pathname : util.validate_path,
      value    : util.validate_path_value,
    }
  })

  const submit = () => {
    const { pathname, value } = form.getValues()
    const path = [ pathname, value ]
    form.validate()
    try {
      if (form.isValid()) {
        console.log('adding path')
        policy.path.add(path as any)
        console.log(policy)
      }
    } catch (err) {
      throw new Error('invalid path entry')
    }
  }

  const rows = policy.data.paths.map((elem, idx) => {
    const [ pathname, amt ] = elem
    return (
      <Table.Tr key={elem.toString() + String(idx)}>
        <Table.Td>{pathname}</Table.Td>
        <Table.Td>{amt}</Table.Td>
        { is_create &&
          <Table.Td>
            <ActionIcon color="red" onClick={() => policy.path.rem(idx) }>
              <IconTrash size="1rem" />
            </ActionIcon>
          </Table.Td>
        }
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
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        }

      { is_create &&
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
          </Group>
          <Space h={10}/>
          <Button
            variant='subtle'
            leftSection={<IconPlus size={'14px'}/>}
            style={{borderRadius: '15px', color: '#0068FD' }}
            onClick={submit}
          >Add</Button>
      </Fieldset>
      }
    </Box>
  )
}
