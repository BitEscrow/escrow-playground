import { useState }      from 'react'
import { useNavigate }   from 'react-router-dom'
import { useDraftStore } from '@/hooks/useDraft'
import { DraftUtil }     from '@scrow/sdk/client'

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

export default function CreateDraftView () {

  const draft    = useDraftStore()
  const navigate = useNavigate()

  const [ view, setView ] = useState('fields')

  const init_draft = () => {
    try {
      const link = DraftUtil.encode(draft.data)
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
          <FormView />
        </Tabs.Panel>
        <Tabs.Panel value="json">
          <JsonView />
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
