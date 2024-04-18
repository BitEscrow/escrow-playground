import { Box, Button, JsonInput } from '@mantine/core'
import { DraftSession } from '@scrow/sdk'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  data    : DraftSession
  setData : Dispatch<SetStateAction<DraftSession>>
}

export default function ({ data, setData } : Props) {

  const [ json, setJson ]     = useState(JSON.stringify(data, null, 2))
  const [ isValid, setValid ] = useState(false)

  function submit () {
    if (isValid) {
      const draft = JSON.parse(json)
      setData(draft)
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
