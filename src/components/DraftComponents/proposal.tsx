import {
  Accordion, Box,
} from '@mantine/core'

import InfoForm    from './proposal/info'
import DetailForm  from './proposal/terms'
import PathForm    from './proposal/paths'
import PaymentForm from './proposal/payments'
import ProgramForm from './proposal/programs'
import TaskForm    from './proposal/tasks'

import {
  IconRoute,
  IconCoins,
  IconPrompt,
  IconList,
  IconSettings,
} from '@tabler/icons-react'

export default function () {

  return (
    <Box>
      <InfoForm />
      <Accordion mt="xs">
        <Accordion.Item key="paths" value="paths">
          <Accordion.Control icon={<IconRoute size={18}/>}>Paths</Accordion.Control>
          <Accordion.Panel>
            <PathForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="payments" value="payments">
          <Accordion.Control icon={<IconCoins size={18}/>}>Payments</Accordion.Control>
          <Accordion.Panel>
            <PaymentForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="programs" value="programs">
          <Accordion.Control icon={<IconPrompt size={18}/>}>Programs</Accordion.Control>
          <Accordion.Panel>
            <ProgramForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="tasks" value="tasks">
          <Accordion.Control icon={<IconList size={18}/>}>Tasks</Accordion.Control>
          <Accordion.Panel>
            <TaskForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="terms" value="terms">
          <Accordion.Control icon={<IconSettings size={18}/>}>Terms</Accordion.Control>
          <Accordion.Panel>
            <DetailForm />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  )
}
