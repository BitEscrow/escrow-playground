import { WitnessReceipt }   from '@scrow/sdk'
import { get_time_elapsed } from '@/lib/time'

import { IconArrowUpBar, IconLink } from '@tabler/icons-react'

import { ActionIcon, Box, Card, Code, Group, Pill, Stack, Table, TagsInput, Text, Textarea } from '@mantine/core'

interface Props {
  data       : WitnessReceipt[]
  host       : string
  can_submit : boolean
}

export default function ({ data, host, can_submit } : Props) {
  const view_statement = (wid : string) => {
    const url = `${host}/api/witness/${wid}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const rows = data.map((elem, idx) => {
    const { method, action, args, content, path, sigs, stamp, wid, vm_hash } = elem
    return (
      <Stack>
        { (can_submit || idx !== 0) && 
          <Stack align='center'>
            <IconArrowUpBar />
            <Group>
              <Text size='sm'>Hash</Text>
              <Text>:</Text>
              <Code>{vm_hash}</Code>
            </Group>
          </Stack>
        }
        <Card withBorder>
          <Table mb={15}>
            <Table.Thead bg='#EEEEEE'>
              <Table.Tr>
                <Table.Th>Method</Table.Th>
                <Table.Th>Action</Table.Th>
                <Table.Th>Path</Table.Th>
                <Table.Th>Published</Table.Th>
                <Table.Th>Link</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr key={wid}>
                <Table.Td>{method}</Table.Td>
                <Table.Td>{action}</Table.Td>
                <Table.Td>{path}</Table.Td>
                <Table.Td>{get_time_elapsed(stamp)} ago</Table.Td>
                <Table.Td>
                  <ActionIcon color="blue" onClick={() => view_statement(wid)}>
                    <IconLink size="1rem" />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <TagsInput
            readOnly
            ml={5}
            mb={10}
            label={<Text fw={700} size='sm' mb={10}>Arguments</Text>}
            value={args.map(e => String(e))}
            placeholder='no arguments provided'
          />
          <Textarea
            readOnly
            ml={5}
            mb={10}
            label={<Text fw={700} size='sm' mb={10}>Content</Text>}
            value={content}
            placeholder='no content provided'
          />
          <Text fw={700} size='sm' mb={10}>Signers</Text>
          <Pill.Group>
            {sigs.map(e => <Pill>{e.slice(0, 64)}</Pill> )}
          </Pill.Group>
        </Card>
      </Stack>
    )
  })

  return (
    <Box>
      { rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no statements have been submitted</Text>
      }

      { rows.length !== 0 && <Stack gap='md' mb={20}>{rows}</Stack> }
    </Box>
  )
}
