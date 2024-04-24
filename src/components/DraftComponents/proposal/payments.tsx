import { useForm }             from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { useDraftStore }       from '@/hooks/useDraft'
import NoData                  from '@/components/ui/NoData'

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
  Fieldset,
  Table,
} from '@mantine/core'

export default function () {

  const draft = useDraftStore()
  const prop  = draft.proposal

  const form = useForm({
    initialValues: {
      value   : 540,
      address : ''
    },
    validateInputOnChange : true,
    validate : {
      value   : util.validate_path_value,
      address : util.validate_address(prop.data.network)
    }
  })

  const submit = () => {
    const { value, address } = form.getValues()
    const payment = [ value, address ]
    form.validate()
    try {
      if (form.isValid()) {
        prop.payment.add(payment)
      }
    } catch (err) {
      throw new Error('invalid payment entry')
    }
  }

  const rows = prop.data.payments.map((elem, idx) => {
    const [ amt, address ] = elem
    return (
      <Table.Tr key={address}>
        <Table.Td>{amt}</Table.Td>
        <Table.Td>{address}</Table.Td>
        <Table.Td>
          <ActionIcon color="red" onClick={() => prop.payment.rem(idx) }>
            <IconTrash size="1rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A non-conditional payment. These payments are included within all transaction templates.
      </Text>

      {rows.length === 0 && <NoData>no payments have been created</NoData>}

      {rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Address</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }
      
      <Fieldset legend="Add Payment Output">
        <Group mt="sm" align="flex-start">
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
        >
          Add Payment
        </Button>
      </Fieldset>
    </Box>
  )
}
