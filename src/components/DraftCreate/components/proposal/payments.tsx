import { Dispatch, SetStateAction } from 'react'
import { useForm }                  from '@mantine/form'
import { IconPlus, IconTrash }      from '@tabler/icons-react'
import { PaymentEntry }             from '@scrow/sdk/core'
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
  Space,
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

  function add_payment (payment : PaymentEntry) {
    const payments = [ ...proposal.payments, payment ]
    setData({ ...data, proposal : { ...proposal, payments }})
  }

  function rem_payment (idx : number) {
    const payments = [ ...proposal.payments.slice(0, idx), ...proposal.payments.slice(idx + 1) ]
    setData({ ...data, proposal : { ...proposal, payments }})
  }

  const payments = proposal.payments.map((itm, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(itm)}</Code>
      <ActionIcon color="red" onClick={() => rem_payment(idx) }>
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
          add_payment([ value, address ])
          form.reset()
        }}
      >
        Add Payment
      </Button>
    </Box>
  )
}
