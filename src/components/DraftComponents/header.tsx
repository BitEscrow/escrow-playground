import { Dispatch, ReactElement, SetStateAction } from 'react'
import { Box, Divider, Group } from '@mantine/core'

import Controls from './controls'

interface Props {
  title   : ReactElement
  desc    : ReactElement
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ title, desc, setView } : Props) {

  return (
    <Box mb={20}>
      <Group mb={10} align='flex-start' justify='space-between'>
        {title}
        <Controls setView={setView} />
      </Group>
      {desc}
      <Divider mt={10} />
    </Box>
  )
}
