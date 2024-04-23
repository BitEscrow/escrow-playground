import { useForm }     from '@mantine/form'
import { PolicyStore } from 'node_modules/@scrow/hooks/dist/draft/session'

import * as util from '@/lib/draft.js'

import {
  Box,
  Button,
  NumberInput
} from '@mantine/core'

interface Props {
  policy : PolicyStore
}

export default function ({ policy } : Props) {

  const form = useForm({
    initialValues : policy.data,
    validate : {
      payment : (value) => {
        return (String(value) === '') ? null : util.validate_path_value(value ?? 0)
      }
    },
    validateInputOnChange : true
  })

  const submit = () => {
    form.validate()
    if (form.isValid()) {
      const values = form.getValues()
      if (String(values.payment) === "") {
        values.payment = undefined
      }
      policy.update(values)
    }
  }

  const is_create = window.location.pathname === '/draft/new'

  return (
    <Box>
      <NumberInput
        readOnly={!is_create}
        label="Payment"
        description="Specify a payment for this role (in sats)."
        {...form.getInputProps('payment')}
      />
      <NumberInput
        readOnly={!is_create}
        label="Min Seats"
        description="The minimum seats available for this role."
        min={1}
        {...form.getInputProps('min_num')}
      />
      <NumberInput
        readOnly={!is_create}
        label="Max Seats"
        description="The maximum seats available for this role."
        min={1}
        {...form.getInputProps('max_num')}
      />
      { is_create && 
        <Button
          mt={15}
          variant='subtle'
          style={{borderRadius: '15px', color: '#0068FD' }}
          onClick={submit}
        >
          Update
        </Button>
      }
    </Box>
  )
}


