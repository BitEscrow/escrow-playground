import { DraftStore }   from '@scrow/hooks'
import { format_label } from '@/lib/draft'

import { IconTransactionBitcoin } from '@tabler/icons-react'

import { Card, Code, Group, Progress, Tabs, Text } from '@mantine/core'

interface Props {
  draft : DraftStore
}

export default function ({ draft } : Props) {
  const tabs    = draft.tabulate()
  const max_val = Math.max(tabs.proposal.path_total, tabs.roles.path_total)
  const cards   = tabs.proj_paths.map(e => {
    const pct   = Math.min(e[1] / (max_val) * 100, 100)
    return (
      <Card withBorder p={0} key={e[0]}>
        <Text px={20} py={10} ta='center'>{format_label(e[0])}</Text>
        <Code p={5} ta='center'>{e[1]} sats</Code>
        <Progress.Root size={8} radius="0 0 5px 5px">
            <Progress.Section value={pct} color={pct !== 100 ? 'red' : 'green'} />
        </Progress.Root>
      </Card>
    )
  })

  return (
    <Tabs defaultValue="outputs" mb={20}>
      <Tabs.List grow w='100%' mb={30}>
        <Tabs.Tab leftSection={<IconTransactionBitcoin size={18}/>} value="outputs">Transaction Templates</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panel value="outputs" pl={10}>
        {cards.length === 0 && <Text fs='italic' c='dimmed'>You have not defined any spending paths.</Text>}
        <Group justify='flex-start'>{cards}</Group>
      </Tabs.Panel>
    </Tabs>
  )
}
