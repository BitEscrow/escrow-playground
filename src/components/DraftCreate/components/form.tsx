import { DraftSession } from '@scrow/sdk'

import {
  Dispatch,
  SetStateAction
} from 'react'

import {
  Box,
  Tabs,
  TextInput,
  Textarea,
} from '@mantine/core'

import PresetView   from './preset'
import ProposalForm from './proposal'

import {
  IconLicense,
  IconRoute
} from '@tabler/icons-react'

interface Props {
  data    : DraftSession
  setData : Dispatch<SetStateAction<DraftSession>>
}

export default function ({ data, setData }: Props) {



  return (
    <Box mb={30}>
      <TextInput
        label="Title"
        description="Title of the contract."
      />
      <Textarea
        label="Content"
        description="Free-form content field for the contract."
      />
      <PresetView setData={setData} />
      <Tabs defaultValue="proposal">
        <Tabs.List grow w='100%' mb={20}>
          <Tabs.Tab leftSection={<IconLicense size={18}/>} value="proposal">Proposal</Tabs.Tab>
          <Tabs.Tab leftSection={<IconRoute size={18}/>}   value="paths">Roles</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="proposal" pt="xs">
          <ProposalForm data={data} setData={setData} />
        </Tabs.Panel>
        <Tabs.Panel value="roles" pt="xs">
          <p>not implemented</p>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
