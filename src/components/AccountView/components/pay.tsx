import { useClient }     from '@scrow/hooks/client'
import { usePayAddress } from '@scrow/hooks'

import {
  DepositAccount,
  OracleSpendData
} from '@scrow/core'

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import {
  Box,
  Button,
  Center,
  Loader,
  NumberInput,
  Text
} from '@mantine/core'

// User needs to set an amount to deposit and a locktime.
// Then we need to show address + qr code + a copy/paste button

interface Props {
  account    : DepositAccount,
  setPayment : Dispatch<SetStateAction<OracleSpendData | undefined>>
}

export default function ({ account, setPayment } : Props) {

  const { client } = useClient()

  const { data } = usePayAddress(client, account.address)

  const [ amount, setAmount ] = useState(10_000)

  useEffect(() => {
    if (data !== undefined) {
      setPayment(data[0])
    }
  }, [ data ])

  return (
    <Box>
      <Text>Payment Address: {account.address}</Text>
      <NumberInput 
        label="Amount"
        description="The amount you wish to deposit into escrow."
        value={amount}
        onChange={(e) => setAmount(Number(e))}
      />
      <Button mt={10}>Generate QR Code</Button>
      <Text>Checking for payment ...</Text>
      <Center><Loader color="blue" /></Center>
    </Box>
  )
}
