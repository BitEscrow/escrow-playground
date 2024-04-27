import { DraftStore } from '@scrow/hooks'

import {
  Box,
  Tabs
} from '@mantine/core'

import {
  IconLicense,
  IconTie,
  IconUsers
} from '@tabler/icons-react'

import MemberView   from './members'
import ProposalForm from './proposal'
import RoleForm     from './roles'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {

  const is_edit = window.location.pathname === '/draft/view'

  return (
    <Box mb={30}>
      <Tabs defaultValue="proposal">
        <Tabs.List grow w='100%' mb={20}>
          {is_edit && <Tabs.Tab leftSection={<IconUsers size={18}/>} value="members">Members</Tabs.Tab> }
          <Tabs.Tab leftSection={<IconLicense size={18}/>} value="proposal">Proposal</Tabs.Tab>
          <Tabs.Tab leftSection={<IconTie size={18}/>}     value="roles">Roles</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="members">
          <MemberView draft={draft} />
        </Tabs.Panel>
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
