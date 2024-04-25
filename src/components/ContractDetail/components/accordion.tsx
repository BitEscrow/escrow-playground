import { Accordion }    from '@mantine/core'
import { ContractData } from '@scrow/sdk'

import BasePanel    from './panel/base'
import FundsPanel   from './panel/funds'
import ExecPanel    from './panel/exec'
import HistoryPanel from './panel/history'
import InvoicePanel from './panel/invoice'
import TermsPanel   from './panel/terms'
import TxPanel      from './panel/tx'

import {
  IconCalendar,
  IconCoins,
  IconGitBranch,
  IconInfoCircle,
  IconList,
  IconPrompt,
  IconScript
} from '@tabler/icons-react'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  return (
    <Accordion mb={20}>
      <Accordion.Item key="base" value="base">
        <Accordion.Control icon={<IconInfoCircle size={18}/>}>Details</Accordion.Control>
        <Accordion.Panel>
          <BasePanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="exec" value="exec">
        <Accordion.Control icon={<IconPrompt size={18}/>}>Execution</Accordion.Control>
        <Accordion.Panel>
          <ExecPanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="funds" value="funds">
        <Accordion.Control icon={<IconCoins size={18}/>}>Funds</Accordion.Control>
        <Accordion.Panel>
          <FundsPanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="history" value="history">
        <Accordion.Control icon={<IconCalendar size={18}/>}>History</Accordion.Control>
        <Accordion.Panel>
          <HistoryPanel data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="invoice" value="invoice">
        <Accordion.Control icon={<IconScript size={18}/>}>Invoice</Accordion.Control>
        <Accordion.Panel>
          <InvoicePanel data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="terms" value="terms">
        <Accordion.Control icon={<IconList size={18}/>}>Terms</Accordion.Control>
        <Accordion.Panel>
          <TermsPanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="tx" value="tx">
        <Accordion.Control icon={<IconGitBranch size={18}/>}>Transaction</Accordion.Control>
        <Accordion.Panel>
          <TxPanel data={data} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}