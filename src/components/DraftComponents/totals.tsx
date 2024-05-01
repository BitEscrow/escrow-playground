import { IconCalculator } from '@tabler/icons-react'
import { Table, Tabs }    from '@mantine/core'

interface Props {
  path_total  : number,
  pay_total   : number,
  total_value : number
}

export default function ({ path_total, pay_total, total_value } : Props) {
  return (
    <Tabs defaultValue="totals" mb={20}>
      <Tabs.List grow w='100%'>
        <Tabs.Tab leftSection={<IconCalculator size={18}/>} value="totals">Contract Total</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="totals">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Paths</Table.Th>
              <Table.Th>Payments</Table.Th>
              <Table.Th>Total Value</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>{path_total} sats</Table.Td>
              <Table.Td>{pay_total} sats</Table.Td>
              <Table.Td fw={700}>{total_value} sats</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Tabs.Panel>
    </Tabs>
  )
}

