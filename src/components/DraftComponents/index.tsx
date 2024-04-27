import { DraftStore } from '@scrow/hooks'

import {
  Box,
  Tabs
} from '@mantine/core'

import {
  IconLicense,
  IconTie
} from '@tabler/icons-react'

import ProposalForm from './proposal'
import RoleForm     from './roles'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {

  return (
    <Box mb={30} mt={10}>
      <Tabs defaultValue="proposal">
        <Tabs.List grow w='100%' mb={20}>
          <Tabs.Tab leftSection={<IconLicense size={18}/>} value="proposal">Proposal</Tabs.Tab>
          <Tabs.Tab leftSection={<IconTie size={18}/>}     value="roles">Roles</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="proposal">
          <ProposalForm draft={draft} />
        </Tabs.Panel>
        <Tabs.Panel value="roles">
          <RoleForm draft={draft}/>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
