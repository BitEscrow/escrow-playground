import { DraftSession } from '@scrow/sdk/client'

import {
  Dispatch,
  SetStateAction
} from 'react'

import { Box } from '@mantine/core'

interface Props {
  data    : DraftSession
  setData : Dispatch<SetStateAction<DraftSession | undefined>>
}

export default function ({ data, setData }: Props) {

  const roles = data.roles.map(e => (
    <Box>
      
    </Box>
  ))


  return (
    <Box>

    </Box>
  )
}
