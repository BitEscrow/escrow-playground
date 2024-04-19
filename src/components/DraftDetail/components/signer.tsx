import { EscrowSigner } from '@scrow/sdk/client'
import { Box, Tabs }    from '@mantine/core'

import {
  IconArmchair,
  IconUser
} from '@tabler/icons-react'

import MemberView from './members'
import SeatView   from './seats'

interface Props {
  signer : EscrowSigner
}

export default function ({ signer } : Props) {

  return (
    <Box mb={20}>
      <Tabs defaultValue="seats">
        <Tabs.List grow mb={20}>
          <Tabs.Tab leftSection={<IconUser size={18}/>}     value="members">Members</Tabs.Tab>
          <Tabs.Tab leftSection={<IconArmchair size={18}/>} value="seats">Seats</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="members">
          <MemberView signer={signer} />
        </Tabs.Panel>
        <Tabs.Panel value="seats">
          <SeatView signer={signer} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
