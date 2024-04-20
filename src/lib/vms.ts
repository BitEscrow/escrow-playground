import { machines }          from '@/config'
import { VirtualMachineAPI } from '@scrow/sdk'

import CVM from '@scrow/sdk/cvm'

export function get_vm_engine (machine : string) : VirtualMachineAPI {
  switch (machine) {
    case 'cvm':
      return CVM
    default:
      throw new Error('virtual machine not supported: ' + machine)
  }
}

export function has_vm_engine (machine : string) : boolean {
  const allowed = machines
  return allowed.includes(machine)
}
