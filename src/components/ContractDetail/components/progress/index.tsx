import { get_enum_state } from '@/lib/contract'
import { Loader, Tabs, Text }           from '@mantine/core'
import { ContractData }   from '@scrow/sdk'

import FundProgress  from './funds'
import ExecProgress  from './exec'
import TxLink        from './txlink'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  const state = get_enum_state(data).toString()

  return (
    <Tabs defaultValue='0' value={state} mt={20} mb={20}>
      <Tabs.Panel value='0'>
        <FundProgress data={data} />
      </Tabs.Panel>
      <Tabs.Panel value='1'>
        <ExecProgress data={data} />
      </Tabs.Panel>
      <Tabs.Panel value='2'>
        { data.spent &&
          <>
            <TxLink data={data} />
            <Loader color="blue" type="dots" />
          </>
        }
      </Tabs.Panel>
      <Tabs.Panel value='3'>
        { data.spent 
          && <TxLink data={data} />
          || <Text fw={700}>Deposits Released</Text>
        }
      </Tabs.Panel>
    </Tabs>
  )
}