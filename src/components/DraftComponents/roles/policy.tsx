import { PolicyStore } from '@scrow/hooks/draft'

import { format_label, truncate_id }                 from '@/lib/draft'
import { Accordion, Card, Code, Group, Text, Title } from '@mantine/core'
import { IconPrompt, IconRoute, IconSettings }       from '@tabler/icons-react'

import PathForm    from './paths'
import ProgramForm from './programs'
import TermsForm   from './terms'

interface Props {
  policy : PolicyStore
}

export default function ({ policy }: Props) {

  const is_create = window.location.pathname === '/draft/new'

  return (
    <Card withBorder mb="lg">
      <Title size={16} mb={5}>{format_label(policy.data.title + ' Policy')}</Title>
      { !is_create && 
        <Group>
          <Text size='xs'>PID:</Text>
          <Code>{truncate_id(policy.data.id)}</Code>
        </Group>
      }
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
          <Accordion.Control icon={<IconSettings size={18}/>}>Terms</Accordion.Control>
          <Accordion.Panel>
            <TermsForm policy={policy} />
          </Accordion.Panel>
        </Accordion.Item>
    </Accordion>
    </Card>
  )
}
