import { useState }    from 'react'
import { useParams }   from 'react-router-dom'
import { useContract } from '@scrow/hooks/contract'
import { useClient }   from '@/hooks/useClient'

import {
  Card,
  Loader,
  Center,
  Tabs
} from '@mantine/core'

import ContractHeader from './components/header'
import ContractJson   from './components/json'
import ContractPanel  from './components/panel'

export default function () {
  const { cid }    = useParams()
  const { client } = useClient()

  const { data, isLoading } = useContract(client, cid || '')

  const [ view, setView ] = useState('fields')

  return (
    <Card>
      <ContractHeader data={ data } setView={setView} />
      { isLoading && <Center><Loader color="#0068FD" /></Center> }
      { data && !isLoading && 
        <Tabs defaultValue="fields" value={view}>
          <Tabs.Panel value="fields">
            <ContractPanel data={data} />
          </Tabs.Panel>
          <Tabs.Panel value="json">
            <ContractJson data={data} />
          </Tabs.Panel>
        </Tabs>
      }
    </Card>
  )
}
