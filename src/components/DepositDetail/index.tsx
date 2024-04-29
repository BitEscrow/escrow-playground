import { useState }   from 'react'
import { useParams }  from 'react-router-dom'
import { useDeposit } from '@scrow/hooks/deposit'
import { useClient }  from '@/hooks/useClient'

import {
  Card,
  Loader,
  Center,
  Divider,
  Tabs
} from '@mantine/core'

import DepositHeader   from './components/header'
import DepositJson     from './components/json'
import DepositPanel    from './components/accordion'
import DepositTabs     from './components/tabs'

export default function () {
  const { dpid }   = useParams()
  const { client } = useClient()

  const { data, isLoading, update } = useDeposit(client, dpid || '')

  const [ view, setView ] = useState('fields')

  return (
    <Card>
      { isLoading && <Center><Loader color="#0068FD" /></Center> }
      { data && !isLoading &&
        <>
          <DepositHeader data={ data } setView={setView} />
          <Divider mt={20} mb={20} />
          <Tabs defaultValue="fields" value={view}>
            <Tabs.Panel value="fields">
              <DepositPanel data={data} />
            </Tabs.Panel>
            <Tabs.Panel value="json">
              <DepositJson data={data} />
            </Tabs.Panel>
          </Tabs>
          <DepositTabs deposit={data} update={update}/>
        </>
      }
    </Card>
  )
}

