import { get_enum_state } from '@/lib/contract'
import { ContractData }   from '@scrow/sdk'
import { useMediaQuery }  from '@mantine/hooks'

import { Group, Loader, Tabs, Text } from '@mantine/core'

import FundProgress  from './funds'
import ExecProgress  from './exec'
import TxLink        from './txlink'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const breakpoint = useMediaQuery('(min-width: 650px)')
  const state      = get_enum_state(data).toString()

  return (
    <Tabs defaultValue='0' value={state} mt={breakpoint ? 40 : 0} mb={20}>
      <Tabs.Panel value='0'>
        { !data.canceled && <FundProgress data={data} /> }
      </Tabs.Panel>
      <Tabs.Panel value='1'>
        { data.activated && <ExecProgress data={data} /> }
      </Tabs.Panel>
      <Tabs.Panel value='2'>
        { data.spent &&
          <Group justify='center'>
            <TxLink data={data} />
            <Loader color="blue" type="dots" />
          </Group>
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