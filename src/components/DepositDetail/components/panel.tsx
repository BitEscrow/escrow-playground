import { DepositData } from '@scrow/sdk/core'
import { Accordion }   from '@mantine/core'

import { IconHeartHandshake, IconInfoCircle, IconPrompt } from '@tabler/icons-react'

import CovenantPanel   from './panels/covenant'
import DetailsPanel    from './panels/details'
import TxPanel         from './panels/tx'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  return (
    <Accordion>
      <Accordion.Item key="base" value="base">
        <Accordion.Control icon={<IconInfoCircle size={18}/>}>Basic Info</Accordion.Control>
        <Accordion.Panel>
          <DetailsPanel data={data}  />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="covenant" value="covenant">
        <Accordion.Control icon={<IconPrompt size={18}/>}>Covenant</Accordion.Control>
        <Accordion.Panel>
          <CovenantPanel data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="tx" value="tx">
        <Accordion.Control icon={<IconHeartHandshake size={18}/>}>Transaction</Accordion.Control>
        <Accordion.Panel>
        <TxPanel data={data}       />
        </Accordion.Panel>
      </Accordion.Item>    
    </Accordion>
  )
}

