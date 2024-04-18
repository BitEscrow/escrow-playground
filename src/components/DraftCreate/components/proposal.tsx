import { DraftSession }  from '@scrow/sdk'

import {
  Dispatch,
  SetStateAction
} from 'react'

import {
  Accordion,
} from '@mantine/core'

import DetailForm  from './proposal/details'
import PathForm    from './proposal/paths'
import PaymentForm from './proposal/payments'
import ProgramForm from './proposal/programs'
import TaskForm    from './proposal/tasks'

import {
  IconLicense,
  IconRoute,
  IconCoins,
  IconPrompt,
  IconList,
} from '@tabler/icons-react'

interface Props {
  data    : DraftSession
  setData : Dispatch<SetStateAction<DraftSession>>
}

export default function ({ data, setData }: Props) {

  return (
    <Accordion>
      <Accordion.Item key="details" value="details">
        <Accordion.Control icon={<IconLicense size={18}/>}>Details</Accordion.Control>
        <Accordion.Panel>
          <PathForm data={data} setData={setData} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="paths" value="paths">
        <Accordion.Control icon={<IconRoute size={18}/>}>Paths</Accordion.Control>
        <Accordion.Panel>
          <PathForm data={data} setData={setData} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="payments" value="payments">
        <Accordion.Control icon={<IconCoins size={18}/>}>Payments</Accordion.Control>
        <Accordion.Panel>
          <PaymentForm data={data} setData={setData} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="programs" value="programs">
        <Accordion.Control icon={<IconPrompt size={18}/>}>Programs</Accordion.Control>
        <Accordion.Panel>
          <PathForm data={data} setData={setData} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="tasks" value="tasks">
        <Accordion.Control icon={<IconList size={18}/>}>Tasks</Accordion.Control>
        <Accordion.Panel>
          <TaskForm data={data} setData={setData} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
