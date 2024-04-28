import { Tabs }        from '@mantine/core'
import { DepositData } from '@scrow/sdk'
import { useSigner }   from '@/hooks/useSigner'

import { IconDownload, IconLock } from '@tabler/icons-react'

import LockForm  from './lock'
import CloseForm from './close'

interface Props {
  deposit : DepositData
  update  : (deposit : DepositData) => void
}

export default function ({ deposit, update } : Props) {
  const { signer } = useSigner()
  const can_lock  = signer !== null && [ 'open', 'pending' ].includes(deposit.status)
  const can_close = signer !== null && [ 'open' ].includes(deposit.status)
  return (
    <Tabs defaultValue="lock">
      <Tabs.List grow w='100%' mb={20}>
        <Tabs.Tab 
          disabled    = {!can_lock}
          leftSection = {<IconLock size={18}/>}
          value       = "Covenant"
        >
          Lock
        </Tabs.Tab>
        <Tabs.Tab
          disabled    = {!can_close}
          leftSection = {<IconDownload size={18}/>}
          value       = "close"
        >
          Close
        </Tabs.Tab>
      </Tabs.List>
      { signer !== null &&
        <>
          <Tabs.Panel value="lock">
            <LockForm deposit={deposit} signer={signer} update={update} />
          </Tabs.Panel>
          <Tabs.Panel value="close">
            <CloseForm data={deposit} signer={signer} update={update}/>
          </Tabs.Panel>
        </>
      }
    </Tabs>
  )
}