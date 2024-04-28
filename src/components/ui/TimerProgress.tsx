import { now }                 from '@scrow/sdk/util'

import { Box, Progress, ProgressRootProps, Tooltip } from '@mantine/core'
import { get_time_elapsed, get_time_remaining } from '@/lib/time'

interface Props extends ProgressRootProps {
  active  : boolean
  start   : number
  end     : number
  colors ?: (pct : number) => string
  
}

const default_colors = (pct : number) => {
  if (pct < 50)    return 'green'
  if (pct < 75)    return 'yellow'
  if (pct < 90)    return 'orange'
  if (pct !== 100) return 'red'
  return 'purple'
}

export default function ({ active, start, end, colors, ...props } : Props) {


  const current  = now()
  const progress = get_progress(start, current, end)

  colors = colors ?? default_colors

  const elapsed = get_time_elapsed(start, current)
  const remains = get_time_remaining(end, current)
  const tooltip = `${elapsed} elapsed, ${remains} remaining`

  return (
    <Box>
      <Tooltip label={tooltip}>
        <Progress.Root size={10} radius={0} { ...props }>
            <Progress.Section value={progress} color={colors(progress)} />
        </Progress.Root>
      </Tooltip>
    </Box>
  )
}

function get_progress (
  created_at : number,
  current    : number,
  expires_at : number
) {
  const total_time   = expires_at - created_at // Total duration in seconds.
  const elapsed_time = current - created_at    // Elapsed time in seconds.

  // Check if the current time is within the range
  if (current < created_at) {
    return 0   // If current time is before the start, return 0%.
  } else if (current > expires_at) {
    return 100 // If current time is after the end, return 100%.
  }

  return (elapsed_time / total_time) * 100
}
