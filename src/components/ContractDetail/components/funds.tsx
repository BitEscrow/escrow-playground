import { get_time_remaining } from '@/lib/time'
import { IconLink }           from '@tabler/icons-react'
import { ContractData }       from '@scrow/sdk'
import { useContractFunds }   from '@scrow/hooks'
import { useClient }          from '@/hooks/useClient'
import { useSigner }          from '@/hooks/useSigner'
import { useNavigate }        from 'react-router-dom'

import { ActionIcon, Box, Button, Loader, Table, Text } from '@mantine/core'

interface Props {
  contract : ContractData
}

export default function ({ contract } : Props) {
  const { cid, activated, canceled } = contract

  const { client } = useClient()
  const { signer } = useSigner()

  const navigate = useNavigate()

  const { data, isLoading } = useContractFunds(client, cid)

  const can_commit = (signer !== null && !canceled && !activated)

  const deposit = () => {
    navigate(`/deposit/new?cid=${contract.cid}`)
  }

  const open_mempool = (txid : string) => {
    const url = `${client.oracle_url}/tx/${txid}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const rows = data.map((elem) => {
    const { expires_at, status, utxo } = elem
    return (
      <Table.Tr key={utxo.txid}>
        <Table.Td>{status}</Table.Td>
        <Table.Td>{utxo.value}</Table.Td>
        <Table.Td>{get_time_remaining(expires_at)}</Table.Td>
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
      { isLoading  &&  <Loader /> }

      { !isLoading && rows.length === 0 && 
        <Text fs="italic" mb={30} ml={30} c='dimmed' size='sm'>no deposits have been collected</Text>
      }

      { rows.length !== 0 &&
        <Table mb={15}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Status</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Expires</Table.Th>
              <Table.Th>Link</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      }

      { can_commit && <Button onClick={deposit}>Make a Deposit</Button> }
    </Box>
  )
}
