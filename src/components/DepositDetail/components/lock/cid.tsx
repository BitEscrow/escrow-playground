import { useContractList } from '@scrow/hooks'
import { useClient }       from '@/hooks/useClient'
import { is_hash }         from '@scrow/sdk/util'
import {EscrowSigner }     from '@scrow/sdk'

import { Autocomplete, Loader } from '@mantine/core'

import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  cid    : string | null
  setCid : Dispatch<SetStateAction<string | null>>
  signer : EscrowSigner
}

export default function ({ cid, setCid, signer  } : Props) {
  const { client } = useClient()

  const [ error, setError ] = useState<String | null>(null)

  const { data, isLoading } = useContractList(client, signer)

  const cids = data
    .filter(e => e.status === 'published')
    .sort((a, b) => b.created_at - a.created_at)
    .map(e => e.cid)

  const setter = (e : string) => {
    if (e === '') {
      setCid(null)
      setError(null)
    } else {
      if (!is_hash(e)) {
        setError('invalid contract id')
      } else {
        setError(null)
      }
      setCid(e)
    }
  }
  
  return (
    <Autocomplete
      mb={15}
      description="The ID of the contract that you wish to fund."
      placeholder="enter cid ..."
      rightSection={isLoading && <Loader />}
      data={cids}
      error={error}
      value={cid ?? ''}
      onChange={setter}
    />
  )
}
