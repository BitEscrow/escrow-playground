import { ContractData }     from '@scrow/sdk'
import { useContractFunds } from '@scrow/hooks'
import { useClient }        from '@/hooks/useClient'
import { useSigner }        from '@/hooks/useSigner'
import { Box, Loader }      from '@mantine/core'

import FundsList  from './funds'
import CommitForm from './commit'
import { useEffect } from 'react'

interface Props {
  contract : ContractData
}

export default function ({ contract } : Props) {
  const { cid, activated, canceled } = contract

  const { client } = useClient()
  const { signer } = useSigner()

  const { data, error, isLoading, update } = useContractFunds(client, cid, !canceled)

  const can_commit = (signer !== null && !canceled && !activated)

  useEffect(() => {

  }, [ error ])

  return (
    <Box>
      { isLoading  &&         <Loader /> }
      { !isLoading && data && <FundsList data={data} oracle={client.oracle_url}/> }
      { can_commit &&         <CommitForm contract={contract} signer={signer} update={update} /> }
    </Box>
  )
}
