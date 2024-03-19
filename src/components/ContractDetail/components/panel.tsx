import { useSigner }    from '@/hooks/useSigner'
import { ContractData } from '@scrow/core'

import { Accordion, Box, Tabs } from '@mantine/core'

import ActionButtons   from './actions'
import DetailsPanel    from './panels/details'
import FundsPanel      from './panels/funds'
import SessionPanel    from './panels/session'
import TermsPanel      from './panels/terms'
import TxPanel         from './panels/tx'
import JsonView        from './json'
import FundProgress    from './progress'

interface Props {
  data : ContractData
  view : string
}

export default function ({ data, view } : Props) {

  const { signer } = useSigner()

  return (
    <Box mt={20} maw={700}>
      <FundProgress data={data} />
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <Accordion defaultValue="details">
            <DetailsPanel data={data} />
            <FundsPanel data={data} />
            <SessionPanel data={data} />
            <TermsPanel data={data} />
            <TxPanel data={data} />
          </Accordion>
        </Tabs.Panel>
        <Tabs.Panel value="json">
          <JsonView data={data} />
        </Tabs.Panel>
      </Tabs>
      { signer !== null && <ActionButtons data={data} signer={signer} /> }
    </Box>
  )
}

