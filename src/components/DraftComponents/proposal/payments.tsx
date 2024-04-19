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
  Space,
} from '@mantine/core'

export default function () {

  const draft = useDraftStore()
  const prop  = draft.proposal

  const form = useForm({
    initialValues: {
      value   : 540,
      address : ''
    }
  })

  const payments = prop.data.payments.map((item, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(item)}</Code>
      <ActionIcon color="red" onClick={() => prop.payment.rem(idx) }>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ))

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A non-conditional payment. Payments are included within all spending paths.
      </Text>

      {payments.length !== 0 && payments || <Text mb={30} ml={30} c='dimmed' size='sm'>no payments have been created</Text>}

      <Group mt="sm">
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
          const { value, address } = form.values
          prop.payment.add([ value, address ])
        }}
      >
        Add Payment
      </Button>
    </Box>
  )
}
