import { useState }      from 'react'
import { useNavigate }   from 'react-router-dom'
import { useDraftStore } from '@/hooks/useDraft'
import { DraftUtil }     from '@scrow/sdk/client'

import {
  Button,
  Card,
  Space,
  Tabs,
  Text,
  Title
} from '@mantine/core'

import DraftHeader  from '../DraftComponents/header'
import FormView     from '../DraftComponents/tabs'
import JsonView     from '../DraftComponents/json'
import PresetView   from '../DraftComponents/preset'

export default function CreateDraftView () {

  const draft    = useDraftStore()
  const navigate = useNavigate()

  const [ view, setView ] = useState('fields')

  const update_link = () => {
    try {
      const link = DraftUtil.encode(draft.data)
      navigate(`/draft/view?enc=${link}`)
    } catch {
      return
    }
  }
  
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <DraftHeader setView={setView}>
        <>
          <Title order={2} mb={15}>
            New Draft
          </Title>
          <Text>
            Create a new draft for a contract.
          </Text>
        </>
      </DraftHeader>
      <PresetView />
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
        onClick={() => update_link()}
      >
        Create Draft
      </Button>
    </Card>
  )
}
