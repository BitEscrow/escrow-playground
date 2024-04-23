import { Accordion }    from '@mantine/core'
import { ContractData } from '@scrow/sdk'

import BasePanel  from './panels/base'
import FundsPanel from './panels/funds'
import ExecPanel  from './panels/exec'
import ClosePanel from './panels/settlement'
import TermsPanel from './panels/terms'

import { IconHeartHandshake, IconInfoCircle, IconList, IconMoneybag, IconPrompt } from '@tabler/icons-react'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  return (
    <Accordion>
      <Accordion.Item key="base" value="base">
        <Accordion.Control icon={<IconInfoCircle size={18}/>}>Basic Info</Accordion.Control>
        <Accordion.Panel>
          <BasePanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="funds" value="funds">
        <Accordion.Control icon={<IconMoneybag size={18}/>}>Funding</Accordion.Control>
        <Accordion.Panel>
          <FundsPanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="exec" value="exec">
        <Accordion.Control icon={<IconPrompt size={18}/>}>Execution</Accordion.Control>
        <Accordion.Panel>
          <ExecPanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="close" value="close">
        <Accordion.Control icon={<IconHeartHandshake size={18}/>}>Settlement</Accordion.Control>
        <Accordion.Panel>
          <ClosePanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="terms" value="terms">
        <Accordion.Control icon={<IconList size={18}/>}>Terms</Accordion.Control>
        <Accordion.Panel>
          <TermsPanel  data={data} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}