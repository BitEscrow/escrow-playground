import { EscrowSigner }       from '@scrow/sdk/client'
import { useClient }          from '@/hooks/useClient'
import { get_time_remaining } from '@/lib/time'
import { IconExternalLink, IconZoom }           from '@tabler/icons-react'
import { useNavigate }        from 'react-router-dom'
import { useDepositList }     from '@scrow/hooks'

import { ActionIcon, Loader, Stack, Table, Text } from '@mantine/core'
import { truncate_id } from '@/lib/draft'

interface Props {
  signer: EscrowSigner
}

export default function ({ signer }: Props) {

  const { client }          = useClient()
  const { data, isLoading } = useDepositList(client, signer)

  const navigate = useNavigate()

  const rows = data.map((elem) => {
    const { confirmed, dpid, expires_at, status, utxo } = elem

    const remaining = (confirmed)
      ? get_time_remaining(expires_at)
      : 'N/A'

    const satpoint = `${truncate_id(utxo.txid)}:${utxo.vout}`

    const open_mempool = () => {
      const url = `${client.oracle_url}/tx/${utxo.txid}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
      <Table.Tr key={dpid}>
        <Table.Td>
          <ActionIcon color="blue" size={24}>
            <IconZoom size={16} onClick={() => navigate(`/deposit/${dpid}`)}/>
          </ActionIcon>
        </Table.Td>
        <Table.Td>{satpoint}</Table.Td>
        <Table.Td>{status}</Table.Td>
        <Table.Td>{utxo.value}</Table.Td>
        <Table.Td>{remaining}</Table.Td>
        <Table.Td>
          <ActionIcon color="blue" size={24}>
            <IconExternalLink size={16} onClick={() => open_mempool()}/>
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Stack>
      { isLoading  &&  <Loader /> }
      { !isLoading && rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>You have no known deposits</Text>
      }

      { rows.length !== 0 &&
        <Table mb={15} striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>View</Table.Th>
              <Table.Th>Satpoint</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Expires</Table.Th>
              <Table.Th>Link</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }
    </Stack>
  )
}
