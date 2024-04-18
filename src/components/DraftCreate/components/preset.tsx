import { DraftSession } from '@scrow/sdk/client'
import { ProposalData } from '@scrow/sdk/core'

import {
  Dispatch,
  SetStateAction,
  useState
} from 'react'

import {
  DraftUtil,
  RoleTemplate
} from '@scrow/sdk/client'

import {
  Button,
  Group,
  NativeSelect
} from '@mantine/core'

import presets_json from '../presets.json' assert { type: 'json' }

type PresetEnum = keyof typeof presets_json

interface Props {
  setData : Dispatch<SetStateAction<DraftSession>>
}

export default function ({ setData } : Props) {

  const [ preset, setPreset ] = useState('default')

  const apply_preset = () => {
    const { proposal, roles } = presets_json[preset as PresetEnum]
    const draft = DraftUtil.create(proposal as ProposalData, roles as RoleTemplate[])
    setData(draft)
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
