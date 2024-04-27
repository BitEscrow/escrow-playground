import { Button, Group, TextInput }           from '@mantine/core'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  setCid : Dispatch<SetStateAction<string | null>>
}

export default function ({ setCid } : Props) {
  const [ input, setInput ] = useState('')
  return (
    <Group>
      <TextInput
        description='Enter the ID for a published contract.'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={() => setCid(input)}>Submit</Button>
    </Group>
  )
}
