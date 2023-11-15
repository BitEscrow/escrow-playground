import { ActionIcon, Button, Group } from '@mantine/core'

import { IconKey } from '@tabler/icons-react'

interface Props {
  navi_opened : boolean
  navi_toggle : () => void
  side_opened : boolean
  side_toggle : () => void
}

export default function Header(props : Props) {
  const { navi_toggle, side_toggle } = props

  return (
    <Group p={10} justify='space-between'>
      <Button
        onClick    = { navi_toggle }
        aria-label = "Toggle navbar"
      >
        BitEscrow
      </Button>
      <ActionIcon variant="filled" color="blue" aria-label="Signer" onClick={side_toggle}>
        <IconKey style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Group>
  )
}
