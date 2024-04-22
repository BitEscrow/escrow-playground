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

export default function () {

  return (
    <Box mb={30}>
      <Tabs defaultValue="proposal">
        <Tabs.List grow w='100%' mb={20}>
          <Tabs.Tab leftSection={<IconUsers size={18}/>}   value="members">Members</Tabs.Tab>
          <Tabs.Tab leftSection={<IconLicense size={18}/>} value="proposal">Proposal</Tabs.Tab>
          <Tabs.Tab leftSection={<IconTie size={18}/>}     value="roles">Roles</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="members">
          <MemberView />
        </Tabs.Panel>
        <Tabs.Panel value="proposal">
          <ProposalForm />
        </Tabs.Panel>
        <Tabs.Panel value="roles">
          <RoleForm />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
