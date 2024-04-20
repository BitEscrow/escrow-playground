import { useClipboard }  from '@mantine/hooks'
import { useDraftStore } from '@/hooks/useDraft'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Group,
  TextInput
} from '@mantine/core'

export default function () {

  const { origin, pathname } = window.location

  const draft = useDraftStore()
  const clip  = useClipboard({ timeout: 500 })

  const [ data, setData ] = useState(draft.encoded)

  useEffect(() => {
    if (data !== draft.encoded) {
      setData(draft.encoded)
    }
  }, [ data, draft.encoded ])

  return (
    <Box>
      <TextInput
        mb={15}
        readOnly
        label="Contract Data" description="Copy, paste, or share this data blob with others to collaborate."
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
        <Button
          onClick={async () => {
            const data = await navigator.clipboard.readText()
            draft.decode(data)
          }}
        >
          Paste
        </Button>
        <Button
          onClick={() => clip.copy(`${origin}${pathname}?enc=${data}`)}
        >
          Share
        </Button>

      </Group>
    </Box>
  )
}
