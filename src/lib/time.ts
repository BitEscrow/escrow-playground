import { now } from '@scrow/sdk/util'

export function get_time_elapsed (
  created : number,
  current : number = now()
) : string {
  const past = new Date(created * 1000)
  const now  = new Date(current * 1000)

  let elapsed = (now.getTime() - past.getTime()) / 1000

  const days = Math.floor(elapsed / (24 * 60 * 60))

  if (days !== 0) {
    return (days > 1) ? `${days} days` : `${days} day`
  } else {
    elapsed -= days * 24 * 60 * 60
  }

  const hours = Math.floor(elapsed / (60 * 60))

  if (hours !== 0) {
    return (hours > 1) ? `${hours} hours` : `${hours} hour`
  } else {
    elapsed -= hours * 60 * 60
  }

  const minutes = Math.floor(elapsed / 60)

  return (minutes > 1) ? `${minutes} minutes` : `${minutes} minute`
}

export function get_time_remaining (
  expires : number | null,
  current : number = now()
) : string {
  if (expires === null) {
    return 'N/A'
  }

  const now    = new Date(current * 1000)
  const future = new Date(expires * 1000)

  if (future <= now) {
    return 'now'
  }

  let remaining = (future.getTime() - now.getTime()) / 1000

  const days = Math.floor(remaining / (24 * 60 * 60))

  if (days !== 0) {
    return (days > 1) ? `${days} days` : `${days} day`
  } else {
    remaining -= days * 24 * 60 * 60
  }

  const hours = Math.floor(remaining / (60 * 60))

  if (hours !== 0) {
    return (hours > 1) ? `${hours} hours` : `${hours} hour`
  } else {
    remaining -= hours * 60 * 60
  }

  const minutes = Math.floor(remaining / 60)

  return (minutes > 1) ? `${minutes} minutes` : `${minutes} minute`
}

export function get_countdown_timer (
  expires : number | null,
  current : number = now()
) : string {
  if (expires === null) {
    return 'N/A'
  }

  let timer : string[] = []

  let remaining = expires - current

  const days = Math.floor(remaining / (24 * 60 * 60))
  timer.push(String(days).padStart(3, '0'))
  remaining -= days * 24 * 60 * 60

  const hours = Math.floor(remaining / (60 * 60))
  timer.push(String(hours).padStart(2, '0'))
  remaining -= hours * 60 * 60

  const minutes = Math.floor(remaining / 60)
  timer.push(String(minutes).padStart(2, '0'))
  remaining -= minutes * 60

  timer.push(String(remaining).padStart(2, '0'))

  return timer.join(':')
}