import { TextInput, TextInputProps } from '@mantine/core'

interface Props extends Omit<TextInputProps, 'value'> {
  value : number | null
}

export default function ({ value, ...props } : Props) {
  const date = (value !== null) 
    ? new Date(Number(value) * 1000).toLocaleString()
    : 'N/A'
  return (
    <TextInput
      readOnly
      value={date}
      styles={{ input : { fontFamily : 'monospace', backgroundColor : '#EEEEEE' }}}
      { ...props }
    />
  )
}
