import { useState }    from 'react'
import { useParams }   from 'react-router-dom'
import { useContract } from '@scrow/hooks/contract'
import { useClient }   from '@/hooks/useClient'
import { useSigner }   from '@/hooks/useSigner'

import {
  Card,
  Loader,
  Center,
  Tabs,
  Divider
} from '@mantine/core'

import ContractHeader from './components/header'
import ContractJson   from './components/json'
import ContractPanel  from './components/accordion'
import ContractTabs   from './components/tabs'
import Progress       from './components/progress'
import Stepper        from './components/stepper'
import CancelBtn      from './components/cancel'

export default function () {
  const { cid }    = useParams()
  const { client } = useClient()
  const { signer } = useSigner()

  const { data, isLoading } = useContract(client, cid || '')

  const [ view, setView ] = useState('fields')

  const can_cancel = (
    (data !== undefined && signer !== null) &&
    (!data.activated && !data.canceled)     &&
    (data.moderator !== null && data.moderator === signer.pubkey)
  )

  return (
    <Card>
      { !data && isLoading && <Center><Loader color="#0068FD" /></Center> }
      { data &&
        <>
          <ContractHeader data={ data } setView={setView} />
          <Divider mt={20} mb={40} />
          <Stepper contract={data} />
          <Progress data={data} />
          <Tabs defaultValue="fields" value={view}>
            <Tabs.Panel value="fields">
              <ContractPanel data={data} />
              { can_cancel && <CancelBtn contract={data} signer={signer} />}
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
