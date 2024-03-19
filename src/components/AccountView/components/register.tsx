import { Dispatch, SetStateAction, useEffect } from 'react'

import { useClient }   from '@scrow/hooks/client'

import { DepositAccount, DepositData, OracleSpendData } from '@scrow/core'

import { Box, Center, Loader, Text } from '@mantine/core'

// This page should just auto-register.
// Once registration is a success, forward to the deposit.

interface Props {
  account    : DepositAccount
  deposit   ?: DepositData
  payment    : OracleSpendData
  setDeposit : Dispatch<SetStateAction<DepositData | undefined>>
}

export default function ({ account, deposit, payment, setDeposit } : Props) {

  const { client } = useClient()

  useEffect(() => {
    if (deposit === undefined) {
      (async () => {
        const req = { ...account, utxo : payment.txspend }
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
      <Center><Loader color="blue" /></Center>
    </Box>
  )
}
