import { useState }     from 'react'
import { useNavigate }  from 'react-router-dom'
import { ProposalData } from '@scrow/sdk'
import { useSigner }    from '@/hooks/useSigner'

import {
  DraftSession,
  DraftUtil,
  RoleTemplate
} from '@scrow/sdk/client'

import {
  Button,
  Card,
  Divider,
  Space,
  Tabs
} from '@mantine/core'

import DraftHeader  from './components/header'
import FormView     from './components/form'
import JsonView     from './components/json'
import presets_json from './presets.json' assert { type: 'json' }

export default function CreateDraftView () {

  const { proposal, roles } = presets_json['default']
  const draft = DraftUtil.create(proposal as ProposalData, roles as RoleTemplate[])

  const { signer } = useSigner()
  const navigate   = useNavigate()

  const [ data, setData ] = useState<DraftSession>(draft)
  const [ view, setView ] = useState('fields')

  const init_draft = () => {
    try {
      if (signer === null)    throw new Error('Signer not loaded')
      if (data === undefined) throw new Error('session data is null')
      const { proposal, roles } = data
      const draft = DraftUtil.create(proposal, roles)
      const link  = DraftUtil.encode(draft)
      navigate(`/draft/view?enc=${link}`)
    } catch {
      return
    }
  }
  
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <DraftHeader setView={setView} />
      <Divider mb={30} mt={20}/>
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <FormView data={data} setData={setData} />
        </Tabs.Panel>
        <Tabs.Panel value="json">
          <JsonView data={data} setData={setData} />
        </Tabs.Panel>
      </Tabs>
      <Space h="xs" />
      <Button
        style={{
          backgroundColor: '#0068FD',
          borderRadius: '15px',
        }}
        maw = {150}
        variant="filled"
        onClick={() => init_draft()}
      >
        Create Draft
      </Button>
    </Card>
  )
}
