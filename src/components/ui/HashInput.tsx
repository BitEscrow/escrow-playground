import { useClipboard } from '@mantine/hooks'

import { TextInput, TextInputProps, Tooltip } from '@mantine/core'

import { IconCopy, IconCopyCheckFilled } from '@tabler/icons-react'

interface Props extends Omit<TextInputProps, 'value'> {
  value : string | null
}

export default function ({ value, ...props } : Props) {
  const clip = useClipboard({ timeout: 500 })
  const data = (value !== null) ? value : 'N/A'
  return (
    <TextInput
      readOnly
      value={data}
      styles={{ input : { fontFamily : 'monospace', backgroundColor : '#EEEEEE' }}}
      rightSectionWidth={60}
      rightSection={
        value !== null &&
          clip.copied
            ? <Tooltip label='Copied!'>
                <IconCopyCheckFilled
                  color={clip.copied ? 'teal' : 'black'}
                  onClick={() => clip.copy(data)}
                />
              </Tooltip>
            : <Tooltip label='Copy'>
                <IconCopy
                  color={clip.copied ? 'teal' : 'black'}
                  onClick={() => clip.copy(data)}
                />
              </Tooltip>
      }
      { ...props }
    />
  )
}
