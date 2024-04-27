import { ContractData, DepositData, EscrowSigner } from '@scrow/sdk'

import { Button } from '@mantine/core'
import { useClient } from '@/hooks/useClient'
import { useErrResToast } from '@/hooks/useToast'

interface Props {
  contract : ContractData
  deposit  : DepositData
  signer   : EscrowSigner
}

export default function ({ contract, deposit, signer } : Props) {
  const { canceled, activated, fund_pend, fund_value, tx_total } = contract

  const { client } = useClient()
  const available  = fund_pend + fund_value
  const remaining  = tx_total - available
  const allocated  = deposit.utxo.value + available
  const threshold  = Math.floor(tx_total * 1.1)
  
  const can_lock   = (
    (!canceled && !activated) &&
    (remaining > 0 && allocated <= threshold)
  )

  const lock = () => {
    const req = signer.deposit.lock(contract, deposit)
    client.deposit.lock(req).then(res => {
      if (res.ok) {
        // Update deposit
      } else {
        useErrResToast(res)
      }
    })
  }

  return (
    <Button disabled={!can_lock} onClick={lock}>Lock Deposit</Button>
  )
}
