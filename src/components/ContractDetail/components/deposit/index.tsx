import { ContractData }     from '@scrow/sdk'
import { useContractFunds } from '@scrow/hooks'
import { useClient }        from '@/hooks/useClient'
import { useSigner }        from '@/hooks/useSigner'
import { useNavigate }      from 'react-router-dom'

import { Box, Button, Loader } from '@mantine/core'

import FundsList  from './funds'

interface Props {
  contract : ContractData
}

export default function ({ contract } : Props) {
  const { cid, activated, canceled } = contract

  const { client } = useClient()
  const { signer } = useSigner()

  const navigate = useNavigate()

  const { data, isLoading } = useContractFunds(client, cid)

  const can_commit = (signer !== null && !canceled && !activated)

  const deposit = () => {
    navigate(`/deposit/new?cid=${contract.cid}`)
  }

  return (
    <Box>
      { isLoading  &&         <Loader /> }
      { !isLoading && data && <FundsList data={data} oracle={client.oracle_url}/> }
      { can_commit &&         <Button onChange={deposit} >Make a Deposit</Button> }
    </Box>
  )
}
