import { ContractData } from '@scrow/sdk'

export function get_enum_state (contract : ContractData) {
  switch (true) {
    case (contract.settled || contract.spent):
      return 2
    case (contract.closed || contract.activated):
      return 1
    default:
      return 0
  }
}
