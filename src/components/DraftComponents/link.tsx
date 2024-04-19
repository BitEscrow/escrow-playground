import { useClipboard } from '@mantine/hooks'

import {
  Box,
  Button,
  TextInput
} from '@mantine/core'

export default function () {

  const clip = useClipboard({ timeout: 500 })
  const link = window.location.href

  return (
    <Box>
      <TextInput
        readOnly
        label="Share Link" description="Copy/paste this link and share it to collaborate."
        value={link}
        rightSectionWidth={110}
        rightSection={
          <Button
            h={28}
            w={100}
            color={clip.copied ? 'teal' : 'blue'}
            onClick={() => clip.copy('Hello, world!')}
          >
            {clip.copied ? 'Copied' : 'Copy'}
          </Button>
        }
      />
    </Box>
  )
}
