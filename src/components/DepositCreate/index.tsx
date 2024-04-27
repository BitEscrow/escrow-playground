import { useEffect }        from 'react'
import { ContractData }     from '@scrow/sdk'
import { useClient }        from '@/hooks/useClient'
import { useSigner }        from '@/hooks/useSigner'
import { Box, Loader }      from '@mantine/core'
import { useSearchParams }  from 'react-router-dom'

import FundsList  from './components/funds'
import CommitForm from './components/commit'
import { useForm } from '@mantine/form'

interface Props {
  contract : ContractData
}

export default function () {
  const { client } = useClient()
  const { signer } = useSigner()
  const [ params ] = useSearchParams()

  const form = useForm({
    initialValues : {
      cid      : params.get('cid')  ?? '',
      address  : params.get('addr') ?? '',
      duration : params.get('dur')  ?? 0,
      feerate  : params.get('fr')   ?? 1
    }
  })

  return (
    <Box>
      {/* { isLoading  &&         <Loader /> }
      { !isLoading && data && <FundsList data={data} oracle={client.oracle_url}/> }
      { can_commit &&         <CommitForm contract={contract} signer={signer} update={update} /> } */}
    </Box>
  )
}
