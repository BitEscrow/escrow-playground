import { PolicyStore } from '@scrow/hooks/draft'

import { Accordion, Box, Title } from '@mantine/core'

import { IconPrompt, IconRoute, IconSettings } from '@tabler/icons-react'

import DetailForm  from './details'
import PathForm    from './paths'
import ProgramForm from './programs'

interface Props {
  policy : PolicyStore
}

export default function ({ policy }: Props) {

  return (
    <Box mb="lg">
      <Title size={16}>{format_name(policy.data.title + ' Policy')}</Title>
      <Accordion>
        <Accordion.Item key="paths" value="paths">
          <Accordion.Control icon={<IconRoute size={18}/>}>Paths</Accordion.Control>
          <Accordion.Panel>
            <PathForm policy={policy} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="programs" value="programs">
          <Accordion.Control icon={<IconPrompt size={18}/>}>Programs</Accordion.Control>
          <Accordion.Panel>
            <ProgramForm policy={policy} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="settings" value="settings">
          <Accordion.Control icon={<IconSettings size={18}/>}>Settings</Accordion.Control>
          <Accordion.Panel>
            <DetailForm policy={policy} />
          </Accordion.Panel>
        </Accordion.Item>
    </Accordion>
    </Box>
  )
}

function format_name (str : string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}