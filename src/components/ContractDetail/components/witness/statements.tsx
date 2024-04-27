import { WitnessReceipt } from '@scrow/sdk'
import { IconLink }       from '@tabler/icons-react'

import { ActionIcon, Box, Table, Text } from '@mantine/core'

interface Props {
  data : WitnessReceipt[]
  host : string
}

export default function ({ data, host } : Props) {
  const view_statement = (wid : string) => {
    const url = `${host}/api/witness/${wid}`
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
          <ActionIcon color="blue" onClick={() => view_statement(wid)}>
            <IconLink size="1rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Box>
      { rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no statements have been submitted</Text>
      }

      { rows.length !== 0 &&
        <Table mb={15} striped>
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
