import { ScriptEngineAPI } from '@bitescrow/client-sdk'

import CONFIG from '@/config/index.js'
import CVM    from '@bitescrow/client-sdk/cvm'

export function get_vm_engine (machine : string) : ScriptEngineAPI {
  switch (machine) {
    case 'cvm':
      return CVM
    default:
      throw new Error('virtual machine not supported: ' + machine)
  }
}

export function has_vm_engine (machine : string) : boolean {
  const allowed = CONFIG.settings.engines
  return allowed.includes(machine)
}
