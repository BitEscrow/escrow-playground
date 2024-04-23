import { get_enum_state } from '@/lib/contract'
import { Tabs }           from '@mantine/core'
import { ContractData }   from '@scrow/sdk'

import FundProgress  from './funds'
import ExecProgress  from './exec'
import CloseProgress from './confirm'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  const state = get_enum_state(data).toString()

  return (
    <Tabs defaultValue='0' value={state}>
      <Tabs.Panel value='0'>
        <FundProgress data={data} />
      </Tabs.Panel>
      <Tabs.Panel value='1'>
        <ExecProgress data={data} />
      </Tabs.Panel>
      <Tabs.Panel value='2'>
        <CloseProgress data={data} />
      </Tabs.Panel>
    </Tabs>
  )
}