import { IconLink }         from '@tabler/icons-react'
import { useContractFunds } from '@scrow/hooks'
import { useClient }        from '@/hooks/useClient'

import { ActionIcon, Box, Table, Text } from '@mantine/core'
import { getTimeRemaining } from '@/lib/time'

interface Props {
  cid : string
}

export default function ({ cid } : Props) {

  const { client } = useClient()

  const { data, isLoading } = useContractFunds(client, cid)

  const open_mempool = (txid : string) => {
    const url = `${client.oracle_url}/tx/${txid}`
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
      {!isLoading && rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no deposits have been collected</Text>}

      {!isLoading && rows.length !== 0 &&
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
