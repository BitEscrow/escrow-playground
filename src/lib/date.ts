export function convert_date (stamp : number) {
  const utc = Math.floor(stamp * 1000)
  return new Date(utc).toLocaleString()
}
