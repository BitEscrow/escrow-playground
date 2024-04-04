import { useClient } from '@scrow/hooks/client'
import { now }       from '@scrow/core/util'

import {
  DepositAccount,
  EscrowSigner
} from '@scrow/core'

import {
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'

import {
  Box,
  Center,
  Loader,
  Text
} from '@mantine/core'

interface Props {
  account   ?: DepositAccount
  params     : Record<string, string>
  signer     : EscrowSigner
  setAccount : Dispatch<SetStateAction<DepositAccount | undefined>>
}

export default function ({ account, setAccount, signer } : Props) {

  const query  = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(query.entries())

  const lock = params.lock ? Number(params.lock) : 60 * 60 * 48
  const idx  = params.idx  ? Number(params.idx)  : now()

  const { client } = useClient()

  useEffect(() => {
    if (account === undefined) {
      (async () => {
        const req = signer.account.create(lock, idx)
        const res = await client.deposit.request(req)
        if (!res.ok) throw new Error(res.error)
        setAccount(res.data.account)
      })()
    }
  })

  return (
    <Box>
      <Text>Requesting a deposit account from the Provider...</Text>
      <Center><Loader color="#0068FD" /></Center>
    </Box>
  )
}
