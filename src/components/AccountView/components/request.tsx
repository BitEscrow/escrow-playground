import { AccountData }  from '@scrow/sdk/core'
import { useClient }    from '@scrow/hooks/client'
import { EscrowSigner } from '@scrow/sdk/client'

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
import { useSigner } from '@/hooks/useSigner'

interface Props {
  account   ?: AccountData
  params     : Record<string, string>
  signer     : EscrowSigner
  setAccount : Dispatch<SetStateAction<AccountData| undefined>>
}

export default function ({ account, setAccount, signer } : Props) {

  const query  = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(query.entries())

  const lock = params.lock ? Number(params.lock) : 60 * 60 * 48

  const { client } = useClient()

  useEffect(() => {
    if (signer !== null && account === undefined) {
      (async () => {
        const req = signer.account.create('', lock)
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
