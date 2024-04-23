import { convert_regex } from '@/lib/util'
import { Network }       from '@scrow/sdk'

import {
  is_bip340_pubkey,
  is_btc_address
} from '@scrow/sdk/util'

export function format_label (str : string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function format_method_name (name : string) {
  const prefix = name.slice(0, 1).toUpperCase()
  const suffix = name.slice(1) + ' Interface'
  return prefix + suffix
}

export function truncate_id (id : string) {
  return (id.length > 16)
    ? `${id.slice(0, 8)} ... ${id.slice(-8)}`
    : id
}

export function validate_path (path : string) {
  if (typeof path !== 'string') {
    return 'Path label must be a string!'
  } else if (path.length > 32) {
    return 'Path label too long!'
  } else if (path.length < 4) {
    return 'Path label is too short!'
  } else if (!/^[a-zA-Z0-9\-_]+$/.test(path)) {
    return 'Path label contains invalid characters!'
  } else {
    return null
  }
}

export function validate_path_value (value : number) {
  if (typeof value !== 'number') {
    return 'Invalid value!'
  } else if (value > Number.MAX_SAFE_INTEGER) {
    return 'Path value is too large.'
  } else if (value < 540) {
    return 'Path value is below dust limit.'
  } else {
    return null
  }
}

export function validate_address (
  network : Network
) {
  return (address : string) => {
    return is_btc_address(address, network)
  }
}


export function validate_method (vm_methods : string[]) {
  return (method : string) => {
    return (vm_methods.includes(method))
    ? null
    : 'method not supported in vm'
  }
}

export function validate_actions (vm_actions : string[]) {
  return (regex ?: string) => {
    const actions = convert_regex(regex, vm_actions)
    if (actions === undefined) return 'action is undefined'
    for (const action of actions) {
      if (!vm_actions.includes(action)) {
        return 'action is not supported in vm: ' + action
      }
    }
    return null
  }
}

export function validate_paths (prop_paths : string[]) {
  return (regex ?: string) => {
    const paths = convert_regex(regex, prop_paths)
    if (paths === undefined) return 'path is undefined'
    for (const path of paths) {
      if (!prop_paths.includes(path)) {
        return 'path does not exist in proposal: ' + path
      }
    }
    return null
  }
}

export function validate_pubkeys (pubkeys : string[]) {
  for (const pub of pubkeys) {
    const err = is_bip340_pubkey(pub)
    if (err !== null) return err + ': ' + pub
  }
  return null
}

export function validate_title (title : string) {
  if (typeof title !== 'string') {
    return 'Contract title must be a string!'
  } else if (title.length > 256) {
    return 'Contract title is too long!'
  } else if (title.length < 32) {
    return 'Contract title is too short!'
  } else if (!/^[a-zA-Z0-9\-_\s]+$/.test(title)) {
    return 'Contract title contains invalid characters!'
  } else {
    return null
  }
}

export function validate_value (value : number) {
  if (typeof value !== 'number') {
    return 'Invalid value!'
  } else if (value > Number.MAX_SAFE_INTEGER) {
    return 'Contract value is too large.'
  } else if (value < 10000) {
    return 'Contract value must be a minimum of 10000 sats.'
  } else {
    return null
  }
}

export function validate_content (content ?: string) {
  if (content === undefined) {
    return null
  } else if (typeof content !== 'string') {
    return 'Content value must be a string!'
  } else if (content.length > 4096) {
    return 'Contract title is too long!'
  } else {
    return null
  }
}