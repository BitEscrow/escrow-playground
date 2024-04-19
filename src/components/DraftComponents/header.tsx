import { Dispatch, SetStateAction } from 'react'

import { Box, Group, Title } from '@mantine/core'

import Controls from './controls'

interface Props {
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ setView } : Props) {

  return (
    <Box>
      <Group mb={20} style={{ justifyContent : 'space-between' }}>
        <Title order={2} mb={15}>
          Create a Contract
        </Title>
        <Controls setView={setView} />
      </Group>
    </Box>
  )
}
