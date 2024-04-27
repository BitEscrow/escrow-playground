import { useNavigate }   from 'react-router-dom'
import { DraftUtil }     from '@scrow/sdk/client'
import { useDraftStore } from '@scrow/hooks'
import { useConfig }     from '@/hooks/useConfig'
import { Network }       from '@scrow/sdk'
import CONFIG            from '@/config/index.js'

import { useEffect, useState } from 'react'

import {
  Button,
  Card,
  Space,
  Tabs,
  Text,
  Title
} from '@mantine/core'

import DraftHeader  from '../DraftComponents/header'
import FormView     from '../DraftComponents'
import JsonView     from '../DraftComponents/json'
import PresetView   from '../DraftComponents/preset'

export default function CreateDraftView () {
  const config   = useConfig()
  const draft    = useDraftStore(CONFIG.default_session)
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

  useEffect(() => {
    draft.proposal.update({ network : config.store.network as Network })
  }, [ config.store.network ])
  
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <DraftHeader setView={setView}>
        <>
          <Title order={2} mb={15}>New Contract</Title>
          <Text>Create an initial draft of a contract.</Text>
        </>
      </DraftHeader>
      <PresetView draft={draft} />
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <FormView draft={draft}/>
        </Tabs.Panel>
        <Tabs.Panel value="json">
          <JsonView draft={draft} />
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
