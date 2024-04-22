import { useForm }     from '@mantine/form'
import { PolicyStore } from 'node_modules/@scrow/hooks/dist/draft/session'

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
    initialValues : policy.data
  })

  return (
    <Box>
      <NumberInput
        label="Payment"
        description="The total value of the payment (in sats)."
        {...form.getInputProps('payment')}
      />
      <NumberInput
        label="Min"
        description="The total value of the payment (in sats)."
        {...form.getInputProps('min_num')}
      />
      <NumberInput
        label="Max"
        description="The total value of the payment (in sats)."
        {...form.getInputProps('max_num')}
      />
      <Button
        variant='subtle'
        style={{borderRadius: '15px', color: '#0068FD' }}
        onClick={() => { policy.update(form.values) }}
      >
        Update
      </Button>

    </Box>
  )
}


