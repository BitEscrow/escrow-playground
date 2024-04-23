import { Button }       from '@mantine/core'
import { useClipboard } from '@mantine/hooks'

interface Props {
  data  : string
  label : string
}

export default function ({ data, label = 'Copy' } : Props) {
  const clip  = useClipboard({ timeout: 500 })

  return (
    <Button
      color={clip.copied ? 'teal' : 'blue'}
      onClick={() => clip.copy(data)}
    >
      {clip.copied ? 'Copied' : label }
    </Button>
  )
}
