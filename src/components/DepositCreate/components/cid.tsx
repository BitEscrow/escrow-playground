import { EscrowSigner }    from '@scrow/sdk'
import { useContractList } from '@scrow/hooks'
import { useClient }       from '@/hooks/useClient'
import { DepositForm }     from '..'

import { Autocomplete, Loader } from '@mantine/core'

interface Props {
  form     : DepositForm
  signer   : EscrowSigner
}

export default function ({ form, signer  } : Props) {
  const { client } = useClient()

  const { data, isLoading } = useContractList(client, signer)

  const cids = data
    .filter(e => e.status === 'published')
    .sort((a, b) => b.created_at - a.created_at)
    .map(e => e.cid)
  
  return (
    <Autocomplete
      mb={15}
      description="The ID of the contract that you wish to fund (optional)."
      placeholder="enter cid ..."
      rightSection={isLoading && <Loader />}
      data={cids}
      {...form.getInputProps('cid')}
    />
  )
}
