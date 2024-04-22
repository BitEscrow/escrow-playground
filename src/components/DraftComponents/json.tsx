import { useDraftStore } from '@/hooks/useDraft'
import { DraftUtil }     from '@scrow/sdk'

import { Box, Button, JsonInput } from '@mantine/core'
import { useEffect, useState }    from 'react'

export default function () {

  const draft = useDraftStore()

  const [ json, setJson ]     = useState(JSON.stringify(draft.data, null, 2))
  const [ isValid, setValid ] = useState(false)

  useEffect(() => {
    try {
      const data = JSON.parse(json)
      DraftUtil.verify(data)
      setValid(true)
      draft.set(data)
    } catch {
      setValid(false)
    }
  }, [ json ])

  return (
    <Box mb={15} maw={700}>
      <JsonInput
        label="JSON Template"
        description="The JSON template for your draft session."
        placeholder="copy/paste your proposal JSON"
        formatOnBlur
        autosize
        minRows={4}
        maxRows={15}
        value={json}
        onChange={(e) => setJson(e)}
        styles={{ input : { color : (isValid) ? 'black' : 'red' } }}
      />
      <Button
        mt={5}
        onClick={() => setJson(JSON.stringify(draft.data, null, 2)) }
      >
        Reset
      </Button>
    </Box>
  )
}
