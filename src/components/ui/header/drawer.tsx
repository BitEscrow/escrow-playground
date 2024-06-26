import { Box, Button }  from '@mantine/core'

interface Props {
  navi_opened : boolean
  navi_toggle : () => void
  side_opened : boolean
  side_toggle : () => void
}

export default function Header(props : Props) {
  const { navi_toggle } = props

  return (
      <Box>
        <Button
          onClick    = {navi_toggle}
          aria-label = "Toggle navbar"
        >
          BitEscrow
        </Button>
      </Box>
  )
}
