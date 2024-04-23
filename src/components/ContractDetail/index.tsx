import { useState }    from 'react'
import { useParams }   from 'react-router-dom'
import { useContract } from '@scrow/hooks/contract'
import { useClient }   from '@/hooks/useClient'

import {
  Card,
  Loader,
  Center,
  Tabs,
  Divider,
  Space
} from '@mantine/core'

import ContractHeader from './components/header'
import ContractJson   from './components/json'
import ContractPanel  from './components/accordion'
import ContractTabs   from './components/tabs'
import Progress       from './components/progress'
import Stepper        from './components/stepper'

export default function () {
  const { cid }    = useParams()
  const { client } = useClient()

  const { data, isLoading } = useContract(client, cid || '')

  const [ view, setView ] = useState('fields')

  return (
    <Card>
      { isLoading && <Center><Loader color="#0068FD" /></Center> }
      { data && !isLoading &&
        <>
          <ContractHeader data={ data } setView={setView} />
          <Divider mt={20} mb={20} />
          <Stepper contract={data} />
          <Space mb={20} />
          <Progress data={data} />
          <Tabs defaultValue="fields" value={view}>
            <Tabs.Panel value="fields">
              <ContractPanel data={data} />
            </Tabs.Panel>
            <Tabs.Panel value="json">
              <ContractJson data={data} />
            </Tabs.Panel>
          </Tabs>
          <ContractTabs data={data} />
        </>
      }
    </Card>
  )
}
