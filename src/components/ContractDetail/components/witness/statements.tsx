import { IconLink }         from '@tabler/icons-react'
import { useStatementList } from '@scrow/hooks'
import { useClient }        from '@/hooks/useClient'

import { ActionIcon, Box, Table, Text } from '@mantine/core'

interface Props {
  vmid : string
}

export default function ({ vmid } : Props) {

  const { client } = useClient()

  const { data, isLoading } = useStatementList(client, vmid)

  const view_statement = (wid : string) => {
    const url = `${client.server_url}/api/witness/${wid}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const rows = data.map((elem) => {
    const { method, action, path, stamp, wid } = elem
    return (
      <Table.Tr key={wid}>
        <Table.Td>{method}</Table.Td>
        <Table.Td>{action}</Table.Td>
        <Table.Td>{path}</Table.Td>
        <Table.Td>{stamp}</Table.Td>
        <Table.Td>
          <ActionIcon color="blue" onClick={() =>  view_statement(wid)}>
            <IconLink size="1rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Box>
      {!isLoading && rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no statements have been submitted</Text>}

      {!isLoading && rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Method</Table.Th>
              <Table.Th>Action</Table.Th>
              <Table.Th>Path</Table.Th>
              <Table.Th>Stamp</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }
    </Box>
  )
}
