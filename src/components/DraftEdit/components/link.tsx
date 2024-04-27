import { useClipboard } from '@mantine/hooks'
import { DraftStore }   from '@scrow/hooks'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Group,
  TextInput
} from '@mantine/core'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {

  const { origin, pathname } = window.location

  const clip  = useClipboard({ timeout: 500 })

  const [ data, setData ] = useState(draft.encoded)

  const paste = async () => {
    const data = await navigator.clipboard.readText()
    draft.decode(data)
  }

  useEffect(() => {
    if (data !== draft.encoded) {
      setData(draft.encoded)
    }
  }, [ data, draft.encoded ])

  return (
    <Box mt={15} mb={15}>
      <TextInput
        mb={15}
        readOnly
        description="Copy, paste, or share this data blob with others to collaborate."
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <Group>
        <Button
          color={clip.copied ? 'teal' : 'blue'}
          onClick={() => clip.copy(data)}
        >
          {clip.copied ? 'Copied' : 'Copy'}
        </Button>
        <Button onClick={paste}>
          Paste
        </Button>
        <Button onClick={() => clip.copy(`${origin}${pathname}?enc=${data}`)}>
          Share
        </Button>
      </Group>
    </Box>
  )
}
