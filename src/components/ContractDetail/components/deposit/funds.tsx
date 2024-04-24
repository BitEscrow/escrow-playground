import { getTimeRemaining } from '@/lib/time'
import { FundingData }      from '@scrow/sdk'
import { IconLink }         from '@tabler/icons-react'

import { ActionIcon, Box, Table, Text } from '@mantine/core'

interface Props {
  data   : FundingData[]
  oracle : string
}

export default function ({ data, oracle } : Props) {
  const open_mempool = (txid : string) => {
    const url = `${oracle}/tx/${txid}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const rows = data.map((elem) => {
    const { expires_at, status, utxo } = elem
    return (
      <Table.Tr key={utxo.txid}>
        <Table.Td>{utxo.vout}</Table.Td>
        <Table.Td>{status}</Table.Td>
        <Table.Td>{utxo.value}</Table.Td>
        <Table.Td>{getTimeRemaining(expires_at)}</Table.Td>
        <Table.Td>
          <ActionIcon color="blue" onClick={() =>  open_mempool(utxo.txid)}>
            <IconLink size="1rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Box>
      { rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no deposits have been collected</Text>}

      { rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Output</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Expires</Table.Th>
              <Table.Th>Link</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }
    </Box>
  )
}
