import {
  Box,
  Tabs
} from '@mantine/core'

import {
  IconLicense,
  IconRoute
} from '@tabler/icons-react'

import ProposalForm from './proposal'
import RoleForm     from './roles'

export default function () {

  return (
    <Box mb={30}>
      <Tabs defaultValue="proposal">
        <Tabs.List grow w='100%' mb={20}>
          <Tabs.Tab leftSection={<IconLicense size={18}/>} value="proposal">Proposal</Tabs.Tab>
          <Tabs.Tab leftSection={<IconRoute size={18}/>}   value="roles">Roles</Tabs.Tab>
        </Tabs.List>
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
