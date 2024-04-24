import { ContractData } from '@scrow/sdk/core'
import { Tabs }         from '@mantine/core'

import FundsView     from './deposit'
import StatementView from './witness'

import {
  IconCertificate,
  IconCoinBitcoin
} from '@tabler/icons-react'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const { activated, vmid } = data

  return (
    <Tabs defaultValue="deposits">
      <Tabs.List grow w='100%' mb={20}>
        <Tabs.Tab 
          disabled={data.canceled}
          leftSection={<IconCoinBitcoin size={18}/>} 
          value="deposits"
        >
          Deposits
        </Tabs.Tab>
        <Tabs.Tab
          disabled={!data.activated}
          leftSection={<IconCertificate size={18}/>} 
          value="statements"
        >
          Statements
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="deposits">
        <FundsView contract={data} />
      </Tabs.Panel>
      <Tabs.Panel value="statements">
        { activated && <StatementView contract={data} vmid={vmid} /> }
      </Tabs.Panel>
    </Tabs>
  )
}
