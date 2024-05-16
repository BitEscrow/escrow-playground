import { useState }       from 'react'
import { EscrowSigner }   from '@scrow/sdk/client'
import { useClient }      from '@/hooks/useClient'
import { useErrResToast } from '@/hooks/useToast'
import FeeSelector        from '@/components/ui/FeeSelector'

import { Box, Button, Group } from '@mantine/core'

import { DepositData } from '@scrow/sdk/core'

interface Props {
  data   : DepositData
  signer : EscrowSigner
  update : (deposit : DepositData) => void
}

export default function ({ data, signer, update } : Props) {
  const { client } = useClient()

  const [ feerate, setFeerate ] = useState(data.return_rate)

  console.log('feerate:', feerate)

  const close = async () => {
    let res
    if (feerate === data.return_rate) {
      const req = signer.deposit.cancel(data.dpid)
      res = await client.deposit.cancel(data.dpid, req)
      console.log('canceled')
    } else {
      const req = signer.deposit.close(data, feerate)
      res = await client.deposit.close(req)
      console.log('closed')
    }
    if (res.ok) {
      update(res.data.deposit)
    } else {
      useErrResToast(res)
    }
  }

  return (
    <Box>
      <FeeSelector feerate={feerate} setRate={setFeerate} txsize={65} />
      <Group mt={10}>
        <Button onClick={close}>
          Close Deposit
        </Button>
        <Button onClick={() => setFeerate(data.return_rate)}>
          Reset Feerate
        </Button>
      </Group>
    </Box>
  )
}
