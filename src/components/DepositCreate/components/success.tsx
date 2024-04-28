import { Button, Code, Group, Stack, Text }  from '@mantine/core'
import { ContractData, DepositData } from '@scrow/sdk'
import { truncate_id }               from '@/lib/draft'
import { useNavigate }               from 'react-router-dom'

interface Props {
  contract : ContractData | null
  deposit  : DepositData
}

export default function ({ contract, deposit } : Props) {

  const navigate = useNavigate()

  return (
    <Stack align='center'>
      <Stack>
        <Text>Your deposit has been registered!</Text>
        { contract !== null &&
          <Group>
            <Text w={150} ff='monospace' ta='right' size='sm'>Contract Id</Text>
            <Text>:</Text>
            <Code>{truncate_id(contract.cid)}</Code>
          </Group>
        }
        <Group>
          <Text w={150} ff='monospace' ta='right' size='sm'>Deposit Id</Text>
          <Text>:</Text>
          <Code>{truncate_id(deposit.dpid)}</Code>
        </Group>
        <Group>
          <Text w={150} ff='monospace' ta='right' size='sm'>Deposit Value</Text>
          <Text>:</Text>
          <Code>{`${deposit.utxo.value} sats`}</Code>
        </Group>
        <Group>
          <Text w={150} ff='monospace' ta='right' size='sm'>Satpoint</Text>
          <Text>:</Text>
          <Code>{`${truncate_id(deposit.utxo.txid)}:${deposit.utxo.vout}`}</Code>
        </Group>
        <Group>
          { contract !== null && <Button onClick={() => navigate(`/contract/${contract.cid}`)}>View Contract</Button> }
          <Button onClick={() => navigate(`/deposit/${deposit.dpid}`)}>View Deposit</Button>
          <Button onClick={() => navigate(`/deposit/new`)}>New Deposit</Button>
        </Group>
      </Stack>
    </Stack>
  )
}
