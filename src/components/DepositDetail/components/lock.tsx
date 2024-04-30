import { useState }     from 'react'
import { EscrowSigner } from '@scrow/sdk/client'
import { useClient }    from '@/hooks/useClient'
import { DepositData }  from '@scrow/sdk/core'
import { useContract }  from '@scrow/hooks'

import { Box, Loader, Stack }  from '@mantine/core'

import CIDForm     from './lock/cid'
import FundSummary from './lock/funds'
import LockSubmit  from './lock/submit'

interface Props {
  deposit : DepositData
  signer  : EscrowSigner
  update  : (deposit : DepositData) => void
}

export default function ({ deposit, signer } : Props) {
  const { client }          = useClient()
  const [ cid, setCid ]     = useState<string | null>(null)
  const { data, isLoading } = useContract(client, cid)

  return (
    <Box>
      <CIDForm cid={cid} setCid={setCid} signer={signer} />
      { cid  && !data && isLoading && <Loader />}
      { data && 
        <Stack>
          <FundSummary contract={data} deposit={deposit} />
          <LockSubmit  contract={data} deposit={deposit} signer={signer}/>
        </Stack>
      }
    </Box>
  )
}
