import { Dispatch, SetStateAction, useEffect } from 'react'

import { useClient }   from '@scrow/hooks/client'

import { AccountData, DepositData, OracleTxSpendData } from '@scrow/sdk/core'

import { Box, Center, Loader, Text } from '@mantine/core'
import { assert } from '@scrow/sdk/util'
import { useSigner } from '@/hooks/useSigner'

// This page should just auto-register.
// Once registration is a success, forward to the deposit.

interface Props {
  account    : AccountData
  deposit   ?: DepositData
  payment    : OracleTxSpendData
  setDeposit : Dispatch<SetStateAction<DepositData | undefined>>
}

export default function ({ account, deposit, payment, setDeposit } : Props) {

  const { client } = useClient()
  const { signer } = useSigner()

  useEffect(() => {
    if (signer !== null && deposit === undefined) {
      (async () => {
        assert.exists
        const req = signer.deposit.register(account, 2, payment.txout)
        const res = await client.deposit.register(req)
        if (!res.ok) throw new Error(res.error)
        const { deposit } = res.data
        setDeposit(deposit)
      })()
    }
  })

  return (
    <Box>
      <Text>Registering payment ...</Text>
      <Center><Loader color="#0068FD" /></Center>
    </Box>
  )
}
