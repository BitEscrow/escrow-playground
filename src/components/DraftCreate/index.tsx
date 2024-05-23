import { useNavigate }   from 'react-router-dom'
import { useDraftStore } from '@scrow/hooks'
import { useConfig }     from '@/hooks/useConfig'
import { ChainNetwork }  from '@scrow/sdk'
import CONFIG            from '@/config/index.js'

import { useEffect, useState }      from 'react'
import { DraftTemplate, DraftUtil } from '@scrow/sdk/client'
import { IconPencil, IconRotate }   from '@tabler/icons-react'

import {
  Button,
  Card,
  Group,
  NativeSelect,
  Space,
  Tabs,
  Text,
  Title,
} from '@mantine/core'

import DraftHeader  from '../DraftComponents/header'
import FormView     from '../DraftComponents'
import JsonView     from '../DraftComponents/json'
import TabulateView from '../DraftComponents/totals'
import TemplateView from '../DraftComponents/templates'

export default function CreateDraftView () {
  const config   = useConfig()
  const draft    = useDraftStore(CONFIG.default_session)
  const tabs     = draft.tabulate()
  const labels   = CONFIG.presets
  const navigate = useNavigate()

  const path_total  = tabs.proposal.path_total + tabs.roles.path_total
  const pay_total   = tabs.proposal.pay_total + tabs.roles.pay_total
  const total_value = path_total + pay_total

  const [ view, setView ] = useState('fields')

  const [ preset, setPreset ] = useState(labels[0])

  const apply_preset = (label : string) => {
    const templ = CONFIG.templates[label as keyof typeof CONFIG.templates]
    templ.proposal.network = config.store.network
    const data = DraftUtil.create(templ as DraftTemplate)
    draft.set(data)
    setPreset(label)
  }

  const update_link = () => {
    try {
      const link = DraftUtil.encode(draft.data)
      navigate(`/draft/view?enc=${link}`)
    } catch {
      return
    }
  }

  useEffect(() => {
    draft.proposal.update({ network : config.store.network as ChainNetwork })
  }, [ config.store.network ])

  useEffect(() => {
    if (total_value !== draft.proposal.data.value)
    draft.proposal.update({ value : total_value })
  }, [ draft ])
  
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <DraftHeader
        setView = {setView}
        title   = {<Title order={2} mb={15}>New Contract</Title>}
        desc    = {<Text>Create an initial draft of a contract.</Text>}
      />
      <NativeSelect
        label="Example Templates"
        description="Select a pre-built template to start with."
        value={preset}
        onChange={(e) => apply_preset(e.target.value)}
        data={labels}
        mb={10}
      />
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <FormView draft={draft}/>
        </Tabs.Panel>
        <Tabs.Panel value="json">
          <JsonView draft={draft} />
        </Tabs.Panel>
      </Tabs>
      <TemplateView draft={draft}/>
      <TabulateView
        path_total={path_total}
        pay_total={pay_total}
        total_value={total_value}
      />
      <Space h="xs" />
      <Group>
        <Button
          style={{
            backgroundColor: '#0068FD',
            borderRadius: '15px',
          }}
          maw = {150}
          variant="filled"
          onClick={() => update_link()}
          rightSection={<IconPencil />}
        >
          Create Draft
        </Button>
        <Button
          maw     = {150}
          variant = "filled"
          onClick = {() => apply_preset(preset)}
          style={{
            backgroundColor: 'teal',
            borderRadius: '15px',
          }}
          rightSection={<IconRotate />}
        >
          Reset
        </Button>
      </Group>

    </Card>
  )
}
