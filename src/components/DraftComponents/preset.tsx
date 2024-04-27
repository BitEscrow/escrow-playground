import { ProposalData }  from '@scrow/sdk/core'
import { useState }      from 'react'
import { DraftStore }    from '@scrow/hooks'
import { useConfig }     from '@/hooks/useConfig'
import CONFIG            from '@/config/index.js'

import {
  DraftUtil,
  RoleTemplate
} from '@scrow/sdk/client'

import {
  Button,
  Group,
  NativeSelect
} from '@mantine/core'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  const config  = useConfig()
  const labels  = CONFIG.presets
  const [ preset, setPreset ] = useState(labels[0])

  const apply_preset = () => {
    const { proposal, roles } = CONFIG.templates[preset as keyof typeof CONFIG.templates]
    proposal.network = config.store.network
    const data = DraftUtil.create(proposal as ProposalData, roles as RoleTemplate[])
    draft.set(data)
  }

  return (
    <Group style={{ width: '100%' }} mb={50}>
      <NativeSelect
        label="Example Templates"
        description="Select a pre-built template to start with."
        value={preset}
        onChange={(e) => setPreset(e.currentTarget.value)}
        data={labels}
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
