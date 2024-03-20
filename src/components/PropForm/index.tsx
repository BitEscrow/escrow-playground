import { ProposalData }      from '@scrow/core'
import { useMediaQuery }     from '@mantine/hooks'
import { UseFormReturnType } from '@mantine/form'

import {
  Box,
  Tabs,
} from '@mantine/core'

import PropDetails   from './components/details'
import PropPaths     from './components/paths'
import PropPayments  from './components/payments'
import PropPrograms  from './components/programs'
import PropTasks     from './components/tasks'

import {
  IconLicense,
  IconRoute,
  IconCoins,
  IconPrompt,
  IconList,
} from '@tabler/icons-react';

interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ({ enabled, form }: Props) {
  
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Box mb={30}>
      <Tabs defaultValue="details">
        <div style={{ overflowX: 'auto', display: isMobile? 'flex' : ''}}>
          <Tabs.List grow style={{minWidth: '700px'}} mb={20}>
            <Tabs.Tab leftSection={<IconLicense size={18}/>} value="details">Details</Tabs.Tab>
            <Tabs.Tab leftSection={<IconRoute size={18}/>} value="paths">Paths</Tabs.Tab>
            <Tabs.Tab leftSection={<IconCoins size={18}/>} value="payments">Payments</Tabs.Tab>
            <Tabs.Tab leftSection={<IconPrompt size={18}/>} value="programs">Programs</Tabs.Tab>
            <Tabs.Tab leftSection={<IconList size={18}/>} value="tasks">Tasks</Tabs.Tab>
          </Tabs.List>
        </div>
        <Tabs.Panel value="details" pt="xs">
          <PropDetails enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="paths" pt="xs">
          <PropPaths enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="payments" pt="xs">
          <PropPayments enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="programs" pt="xs">
          <PropPrograms enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="tasks" pt="xs">
          <PropTasks enabled={enabled} form={form} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
