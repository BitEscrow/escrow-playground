import { Card, Tabs, Text, Title, rem } from '@mantine/core'
import { IconBraces, IconForms }  from '@tabler/icons-react'
import ProposalForm from './components/form'
import ProposalJson from './components/json'

export default function ProposalView () {

  const iconStyle = { width: rem(16), height: rem(16) }

  return (
    <Card maw={700}>
      <Title order={2} mb={15}>Proposal</Title>
      <Text>The proposal is the template used to create a contract. It defines all the paths and terms.</Text>
      <Tabs defaultValue="form">
        <Tabs.List>
          <Tabs.Tab value="form" leftSection={<IconForms style={iconStyle} />}>
            Form Input
          </Tabs.Tab>
          <Tabs.Tab value="json" leftSection={<IconBraces style={iconStyle} />}>
            JSON Input
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="form">
          <ProposalForm />
        </Tabs.Panel>

        <Tabs.Panel value="json" p="xs">
          <ProposalJson />
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}
