import { ContractData } from '@scrow/sdk/core'
import { Space, Tabs }  from '@mantine/core'
import { useSigner }    from '@/hooks/useSigner'

import CommitForm    from './deposit/commit'
import FundList      from './deposit/funds'
import StatementList from './witness/statements'
import SubmitForm    from './witness/submit'

import {
  IconCertificate,
  IconCoinBitcoin
} from '@tabler/icons-react'


interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const { activated, fund_pend, fund_value, status, tx_total, vmid } = data

  const { signer } = useSigner()

  const can_deposit = (signer !== null && status === 'published' && (fund_pend + fund_value) < tx_total)
  const can_submit  = (signer !== null && status === 'active')

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
        <FundList cid={data.cid} />
        { can_deposit && 
          <>
            <Space h={20} />
            <CommitForm contract={data} signer={signer} />
          </>
        }
      </Tabs.Panel>
      <Tabs.Panel value="statements">
        { activated && <StatementList vmid={vmid} /> }
        { can_submit && <SubmitForm contract={data} signer={signer} />}
      </Tabs.Panel>
    </Tabs>
  )
}
