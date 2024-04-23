import { IconLink }         from '@tabler/icons-react'
import { useContractFunds } from '@scrow/hooks'
import { useClient }        from '@/hooks/useClient'

import { ActionIcon, Box, Table, Text } from '@mantine/core'

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
    const { confirmed, expires_at, utxo } = elem
    return (
      <Table.Tr key={utxo.txid}>
        <Table.Td>{confirmed}</Table.Td>
        <Table.Td>{utxo.vout}</Table.Td>
        <Table.Td>{utxo.value}</Table.Td>
        <Table.Td>{expires_at}</Table.Td>
        <Table.Td>
          <ActionIcon color="red" onClick={() =>  open_mempool(utxo.txid)}>
            <IconLink size="1rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  console.log('funds:', data)

  return (
    <Box>
      {!isLoading && rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no deposits have been collected</Text>}

      {!isLoading && rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Confirmed</Table.Th>
              <Table.Th>Output</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Expires At</Table.Th>
              <Table.Th>Link</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }
    </Box>
  )
}