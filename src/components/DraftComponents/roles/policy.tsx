import { PolicyStore } from '@scrow/hooks/draft'

import { format_label, truncate_id }                 from '@/lib/draft'
import { Accordion, ActionIcon, Card, Code, Group, Text, Title } from '@mantine/core'
import { IconPrompt, IconRoute, IconSettings, IconTrash }       from '@tabler/icons-react'

import PathForm    from './paths'
import ProgramForm from './programs'
import TermsForm   from './terms'

interface Props {
  policy : PolicyStore
}

export default function ({ policy }: Props) {

  const is_create = window.location.pathname === '/draft/new'

  const remove = () => {
    const draft = policy._draft
    const idx   = draft.data.roles.findIndex(e => e.id === policy.id)
    draft.role.rem(idx)
  }

  return (
    <Card withBorder mb="lg">
      <Group justify='space-between'>
        <Title size={16} mb={5}>{format_label(policy.data.title + ' Policy')}</Title>
        { is_create &&
          <ActionIcon color="red" onClick={remove}>
            <IconTrash size="1rem" />
          </ActionIcon>
        }
      </Group>
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
          <Accordion.Control icon={<IconSettings size={18}/>}>Settings</Accordion.Control>
          <Accordion.Panel>
            <TermsForm policy={policy} />
          </Accordion.Panel>
        </Accordion.Item>
    </Accordion>
    </Card>
  )
}
