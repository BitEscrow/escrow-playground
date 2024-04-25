import { now } from '@scrow/sdk/util'

import { Progress, ProgressRootProps } from '@mantine/core'

interface Props extends ProgressRootProps {
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

export default function ({ start, end, colors, ...props } : Props) {

  const progress = get_progress(start, end)

  colors = colors ?? default_colors

  return (
    <Progress.Root size={10} radius={0} { ...props }>
        <Progress.Section value={progress} color={colors(progress)} />
    </Progress.Root>
  )
}

function get_progress (
  created_at : number,
  expires_at : number
) {
  const current = now()
  if (expires_at <= current) return 100
  const total   = expires_at - created_at
  const elapsed = current - created_at
  const percent = (elapsed / total) * 100
  const value   = 100 - percent
  return  Math.floor(Math.max(0, Math.min(100, value)))
}
