import { DepositData } from '@scrow/sdk/core'
import { Accordion }   from '@mantine/core'

import { IconCalendar, IconCoins, IconGitBranch, IconInfoCircle, IconLifebuoy, IconLock } from '@tabler/icons-react'

import DepositPanel from './panels/deposit'
import DetailsPanel from './panels/details'
import HistoryPanel from './panels/history'
import LockPanel    from './panels/lock'
import RecoverPanel from './panels/recover'
import TxPanel      from './panels/tx'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  return (
    <Accordion mb={15}>
      <Accordion.Item key="covenant" value="covenant">
        <Accordion.Control icon={<IconLock size={18}/>}>Covenant</Accordion.Control>
        <Accordion.Panel>
          <LockPanel data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="deposit" value="deposit">
        <Accordion.Control icon={<IconCoins size={18}/>}>Deposit</Accordion.Control>
        <Accordion.Panel>
          <DepositPanel data={data}  />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="details" value="details">
        <Accordion.Control icon={<IconInfoCircle size={18}/>}>Details</Accordion.Control>
        <Accordion.Panel>
          <DetailsPanel data={data}  />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="history" value="history">
        <Accordion.Control icon={<IconCalendar size={18}/>}>History</Accordion.Control>
        <Accordion.Panel>
          <HistoryPanel data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="recovery" value="recovery">
        <Accordion.Control icon={<IconLifebuoy size={18}/>}>Recovery</Accordion.Control>
        <Accordion.Panel>
        <RecoverPanel data={data} />
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
