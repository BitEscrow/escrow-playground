import { useSigner }    from '@/hooks/useSigner'
import { ContractData } from '@scrow/sdk/core'

import { Box, Divider, Tabs } from '@mantine/core'

import CancelButton   from './cancel'
import InfoView       from './info'
import DepositView    from './deposit'
import SettlementView from './settlement'

import {
  IconCoinBitcoin,
  IconHeartHandshake,
  IconInfoCircle
} from '@tabler/icons-react'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  const { signer } = useSigner()

  return (
    <Box mt={20} maw={700}>
      <Divider mb={20} mt={20} />
      <Tabs defaultValue="deposit">
        <Tabs.List grow w='100%' mb={20}>
          <Tabs.Tab leftSection={<IconInfoCircle size={18}/>} value="info">Info</Tabs.Tab>
          <Tabs.Tab 
            // disabled={data.canceled}
            leftSection={<IconCoinBitcoin size={18}/>} 
            value="deposit"
          >
            Deposit
          </Tabs.Tab>
          <Tabs.Tab
            // disabled={data.canceled}
            leftSection={<IconHeartHandshake size={18}/>} 
            value="settlement"
          >
            Settlement
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <InfoView data={data} />
        </Tabs.Panel>
        <Tabs.Panel value="deposit">
          <DepositView data={data} />
        </Tabs.Panel>
        <Tabs.Panel value="settlement">
          <SettlementView data={data} />
        </Tabs.Panel>
      </Tabs>
      { signer !== null && <CancelButton contract={data} signer={signer} />}
    </Box>
  )
}
