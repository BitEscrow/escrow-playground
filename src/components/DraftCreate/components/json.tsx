import { useDraftStore } from '@/hooks/useDraft'
import { Box, Button, JsonInput } from '@mantine/core'
import { useEffect, useState }    from 'react'

export default function () {

  const draft = useDraftStore()

  const [ json, setJson ]     = useState(JSON.stringify(draft.data, null, 2))
  const [ isValid, setValid ] = useState(false)

  function submit () {
    if (isValid) {
      const data = JSON.parse(json)
      draft.update(data)
    }
  }

  useEffect(() => {
    try {
      JSON.parse(json)
      setValid(true)
    } catch {
      setValid(false)
    }
  }, [json])

  return (
    <Box maw={700}>
      <JsonInput
        label="Draft Template"
        description="The JSON template for your draft session."
        placeholder="copy/paste your proposal JSON"
        validationError="Invalid JSON"
        formatOnBlur
        autosize
        minRows={4}
        maxRows={15}
        value={json}
        onChange={(e) => setJson(e)}
        styles={{ input : { color : (isValid) ? 'black' : 'red' } }}
      />
      <Button
        style={{
          backgroundColor: '#0068FD',
          borderRadius: '15px',
        }}
        maw = {150}
        variant="filled"
        onClick={() => submit()}
        disabled={!isValid}
      >
        Update Draft
      </Button>
    </Box>
  )
}
