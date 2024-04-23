import { ProposalData }  from '@scrow/sdk/core'
import { useState }      from 'react'
import { useDraftStore } from '@/hooks/useDraft'
import { useConfig }     from '@/hooks/useConfig'

import {
  DraftUtil,
  RoleTemplate
} from '@scrow/sdk/client'

import {
  Button,
  Group,
  NativeSelect
} from '@mantine/core'

import presets_json from '@/config/presets.json' assert { type: 'json' }

type PresetEnum = keyof typeof presets_json

export default function () {

  const config = useConfig()
  const draft  = useDraftStore()

  const [ preset, setPreset ] = useState('default')

  const apply_preset = () => {
    const { proposal, roles } = presets_json[preset as PresetEnum]
    proposal.network = config.store.network
    const data = DraftUtil.create(proposal as ProposalData, roles as RoleTemplate[])
    draft.set(data)
  }

  return (
    <Group style={{ width: '100%' }} mb={50}>
      <NativeSelect
        label="Example Templates"
        description="Pre-built JSON templates to start with."
        value={preset}
        onChange={(e) => setPreset(e.currentTarget.value)}
        data={Object.keys(presets_json)}
        flex={{}}
      />
      <Button
        variant="filled"
        onClick={apply_preset}
      style={{
        width: 'auto',
        minWidth: 150,
        backgroundColor: '#0068FD',
        borderRadius: '15px',
        alignSelf: 'end'
      }}
      >
        Apply
      </Button>
    </Group>
  )
}
