import { useForm }             from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { DraftStore }          from '@scrow/hooks'
import { useErrorToast }       from '@/hooks/useToast'

import NoData       from '@/components/ui/NoData'
import AddressInput from '@/components/ui/AddressInput'

import * as util from '@/lib/draft.js'

import {
  NumberInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  Space,
  Fieldset,
  Table,
} from '@mantine/core'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  const prop = draft.proposal

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
        form.reset()
      }
    } catch (err) {
      useErrorToast('Submission Error', err)
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
          <AddressInput
            account={prop.data.created_at}
            index={prop.data.payments.length}
            onGenerate={(e) => form.setFieldValue('address', e)}
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
