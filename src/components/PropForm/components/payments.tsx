import { UseFormReturnType }    from '@mantine/form'
import { IconPlus, IconTrash }  from '@tabler/icons-react'
import { ProposalData }         from '@scrow/sdk/core'

import {
  NumberInput,
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button
} from '@mantine/core'


interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ({ enabled, form } : Props) {

  const is_disabled = !enabled.includes('payments')
  

  const fields = form.values.payments.map((_, index) => {    
    return (
      <Group key={index}>
        <NumberInput maw={2000}
          label='Amount'
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.0`)}
          defaultValue={1000}
          min={1000}
        />
        <TextInput maw={250}
          label='Address'
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.1`)}
        />
        { !is_disabled && 
          <ActionIcon color="red" onClick={() => form.removeListItem('payments', index)}>
            <IconTrash size="1rem" />
          </ActionIcon>
        }
      </Group>
    )
  })

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A payment is unconditional, and will apply to all spending paths. They are useful for collecting fees, non-refundable costs, etc. Payments are not guaranteed if a contract expires without settlement.
      </Text>
      { fields.length === 0 &&
        <Text c="dimmed" mt={40} ta="center">
          No payments have been created.
        </Text>  
      }

      {fields}

      <Group mt="sm" justify="right">
        <Button
          disabled={is_disabled}
          variant='subtle'
          leftSection={<IconPlus size={'14px'}/>}
          style={{borderRadius: '15px', color: !is_disabled? '#0068FD' : 'gray'}}
          onClick={() =>
            form.insertListItem('payments', [ 1000, undefined ])
          }
        >
          Add Payment
        </Button>
      </Group>
    </Box>
  )
}
