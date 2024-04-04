import { Dispatch, SetStateAction, useEffect } from 'react'

import { useClient } from '@scrow/hooks/client'

import { ContractData, DepositData, EscrowSigner } from '@scrow/core'

import { Box, Center, Loader, Text } from '@mantine/core'

import { useContract } from '@scrow/hooks'

// This page should just auto-register.
// Once registration is a success, forward to the deposit.

interface Props {
  cid         : string
  deposit     : DepositData
  setContract : Dispatch<SetStateAction<ContractData | undefined>>
  signer      : EscrowSigner
}

export default function ({ cid, deposit, setContract, signer } : Props) {

  const { client } = useClient()
  const { data }   = useContract(client, cid)

  useEffect(() => {
    console.log(data)
    if (
      data !== undefined &&
      data.status === 'published' &&
      (data.pending + data.balance) < data.total
    ) {
      (async () => {
        console.log('locking funds...')
        const dpid = deposit.dpid
        const req = signer.account.lock(data, deposit)
        const res = await client.deposit.lock(dpid, req)
        if (!res.ok) throw new Error(res.error)
        setContract(res.data.contract)
      })()
    }
  }, [ data ])

  return (
    <Box>
      <Text>Locking payment to contract...</Text>
      <Center><Loader color="#0068FD" /></Center>
    </Box>
  )
}
