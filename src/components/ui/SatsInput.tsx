import { NumberInputProps, NumberInput } from '@mantine/core'

export default function (
  props : NumberInputProps
) {
  return (
    <NumberInput
      readOnly
      thousandSeparator
      styles={{ input : { fontFamily : 'monospace', backgroundColor : '#EEEEEE' } }}
      suffix=' sats'
      { ...props }
    />
  )
}
