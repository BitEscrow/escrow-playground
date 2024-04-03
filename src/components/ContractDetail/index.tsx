import { useParams }   from 'react-router-dom'
import { useContract } from '@scrow/hooks/contract'
import { useClient }   from '@scrow/hooks/client'

import {
  Card,
  Loader,
  Center
} from '@mantine/core'

import ContractPanel  from './components/panel'
import ContractHeader from './components/header'
import { useState } from 'react'

export default function () {
  const { cid }    = useParams()
  const { client } = useClient()

  const { data, isLoading } = useContract(client, cid || '')

  const [ view, setView ] = useState('fields')

  return (
    <Card>
      <ContractHeader data={ data } setView={setView} />
      { isLoading && <Center><Loader color="blue" /></Center> }
      { data && !isLoading && <ContractPanel data={data} view={view} /> }
    </Card>
  )
}
