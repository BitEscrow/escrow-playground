import { useClipboard } from '@mantine/hooks'
import { DraftStore }   from '@scrow/hooks'
import { useTimeout }   from '@/hooks/useToast'

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

  const [ data, setData ]     = useState(draft.encoded)
  const [ toast, setToast ]   = useTimeout<string>(null)
  const [ pasted, setPasted ] = useTimeout(false, 1000)

  const copy = (prefix = '') => {
    clip.copy(`${prefix}${draft.encoded}`)
    setData(draft.encoded)
  }

  const paste = async () => {
    try {
      if (navigator.clipboard !== undefined) {
        const pasted = await navigator.clipboard.readText()
        setPasted(true)
        setData(pasted)
        draft.decode(pasted)
      } else {
        setPasted(true)
        draft.decode(data)
      }
    } catch (err) {
      console.error(err)
      setToast('the data you are trying to paste is invalid')
    }
  }

  useEffect(() => {
    if (data !== draft.encoded) {
      if (pasted) {
        draft.decode(data)
      } else {
        setData(draft.encoded)
      }
    }
  }, [ data, draft.data ])

  return (
    <Box mt={15} mb={15}>
      <TextInput
        description="Copy, paste, or share this data blob with others to collaborate."
        value={data}
        onChange={(e) => setData(e.target.value)}
        error={toast}
      />
      <Group mt={5} gap='xs'>
        <Button
          color={clip.copied ? 'teal' : 'blue'}
          onClick={() => copy()}
        >
          {clip.copied ? 'Copied' : 'Copy'}
        </Button>
        <Button
          onClick = {paste}
          color   = {pasted ? 'teal' : 'blue'}
        >
          {pasted ? 'Pasted' : 'Paste'}
        </Button>
        <Button onClick={() => copy(`${origin}${pathname}?enc=`)}>
          Share
        </Button>
      </Group>
    </Box>
  )
}
