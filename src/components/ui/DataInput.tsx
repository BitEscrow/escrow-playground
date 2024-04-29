import { TextInput, TextInputProps } from '@mantine/core'

export default function (props : TextInputProps) {
  return (
    <TextInput
      readOnly
      styles={{ input : { fontFamily : 'monospace', backgroundColor : '#EEEEEE' }}}
      { ...props }
    />
  )
}
