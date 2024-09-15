import { ContractData } from '@bitescrow/client-sdk'

export function get_enum_state (contract : ContractData) {
  switch (true) {
    case (contract.settled):
      return 3
    case (contract.spent):
      return 2
    case (contract.activated):
      return 1
    default:
      return 0
  }
}
