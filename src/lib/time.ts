export function getTimeRemaining (stamp : number | null) : string {
  if (stamp === null) {
    return 'N/A'
  }

  const now    = new Date()
  const future = new Date(stamp * 1000)

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
