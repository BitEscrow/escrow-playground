import { useState }       from 'react'
import { EscrowSigner }   from '@scrow/sdk/client'
import { useClient }      from '@/hooks/useClient'
import { useErrResToast } from '@/hooks/useToast'
import FeeSelector        from '@/components/ui/FeeSelector'

import { Box, Button, Card, Fieldset, Group, TextInput } from '@mantine/core'

import { ApiResponse, DepositData, DepositDataResponse } from '@scrow/sdk/core'

interface Props {
  data   : DepositData
  signer : EscrowSigner
  update : (deposit : DepositData) => void
}

export default function ({ data, signer, update } : Props) {
  const { client } = useClient()

  const [ cid, setCid ] = useState('')

  return (
    <Box>
      { data.covenant !== null &&
        <Card>
          Covenant : {JSON.stringify(data.covenant)}
        </Card>
      }
      { data.covenant === null &&
        <Fieldset legend='Lock to Contract'>
          <TextInput
            description='Enter a contract CID to lock up the funds.'
            value={cid}
            onChange={(e) => setCid(e.target.value)}
          />
          <Button onClick={close}>
            Lock Deposit
          </Button>
        </Fieldset>
      }
    </Box>
  )
}
