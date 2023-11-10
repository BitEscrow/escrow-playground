import { Buff } from '@cmdcode/buff'

export function random (size = 8) {
  return Buff.random(size).b64url
}

export function shorten_str (
  str : string, 
  max : number = 15
) {
  return (str.length > max)
    ? str.slice(0, 6) + '...' + str.slice(-6)
    : str
}