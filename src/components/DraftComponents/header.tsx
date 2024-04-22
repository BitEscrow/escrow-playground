import { Dispatch, ReactElement, SetStateAction } from 'react'
import { Box, Divider, Group } from '@mantine/core'

import Controls from './controls'

interface Props {
  children : ReactElement
  setView  : Dispatch<SetStateAction<string>>
}

export default function ({ children, setView } : Props) {

  return (
    <Box mb={15}>
      <Group mb={20} style={{ justifyContent : 'space-between' }}>
        <Box>
          {children}
        </Box>
        <Controls setView={setView} />
      </Group>
      <Divider />
    </Box>
  )
}
