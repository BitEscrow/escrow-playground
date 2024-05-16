import { Button, Stack, Text } from '@mantine/core'
import { useClient }           from '@/hooks/useClient'
import { useErrResToast }      from '@/hooks/useToast'
import { useEffect, useState } from 'react'

import { ContractData, DepositData, EscrowSigner } from '@scrow/sdk'

import { useContractUpdate, useDepositUpdate } from '@scrow/hooks'

interface Props {
  contract : ContractData
  deposit  : DepositData
  signer   : EscrowSigner
}

export default function ({ contract, deposit, signer } : Props) {
  const { canceled, activated, funds_pend, funds_conf, tx_total } = contract

  const { client } = useClient()

  const [ error, setError ] = useState<string | null>(null)

  const setContract = useContractUpdate(client)
  const setDeposit  = useDepositUpdate(client)

  const available  = funds_pend + funds_conf
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
        setContract(contract.cid, res.data.contract)
        setDeposit(deposit.dpid, res.data.deposit)
      } else {
        useErrResToast(res)
      }
    })
  }

  useEffect(() => {
    if (available >= tx_total) {
      setError('contract is already funded')
    } else if (allocated >= threshold) {
      setError('deposit value is over-spending by too much')
    } else {
      setError(null)
    }
  }, [ contract ])

  return (
    <Stack>
       { error && <Text c='red' size='sm'>Error: {error}</Text> }
       <Button disabled={!can_lock} onClick={lock}>Lock Deposit</Button>
    </Stack>
   
  )
}
