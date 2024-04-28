import { EscrowSigner }       from '@scrow/sdk/client'
import { useContractList }    from '@scrow/hooks/contract'
import { useClient }          from '@/hooks/useClient'
import { get_time_remaining } from '@/lib/time'
import { IconZoom }           from '@tabler/icons-react'
import { useNavigate }        from 'react-router-dom'

import { ActionIcon, Loader, Stack, Table, Text } from '@mantine/core'

interface Props {
  signer: EscrowSigner
}

export default function Home({ signer }: Props) {

  const { client }          = useClient()
  const { data, isLoading } = useContractList(client, signer)

  const navigate = useNavigate()

  const rows = data.map((elem) => {
    const { activated, canceled, cid, deadline_at, expires_at, status, terms, tx_total } = elem
    const remaining = (activated)
      ? get_time_remaining(expires_at)
      : (!canceled)
        ? get_time_remaining(deadline_at)
        : 'N/A'
    return (
      <Table.Tr key={cid}>
        <Table.Td>
          <ActionIcon color="blue" size={24}>
            <IconZoom size={16} onClick={() => navigate(`/contract/${cid}`)}/>
          </ActionIcon>
        </Table.Td>
        <Table.Td>{terms.title}</Table.Td>
        <Table.Td>{status}</Table.Td>
        <Table.Td>{tx_total}</Table.Td>
        <Table.Td>{remaining}</Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Stack>
      { isLoading  &&  <Loader /> }
      { !isLoading && rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>You have no known contracts</Text>
      }

      { rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>View</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Expires</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }
    </Stack>
  )
}
