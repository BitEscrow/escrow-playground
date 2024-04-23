import { Accordion }    from '@mantine/core'
import { ContractData } from '@scrow/sdk'

import DetailsPanel from './panels/details'
import FundsPanel   from './panels/funds'
import SessionPanel from './panels/session'
import TermsPanel   from './panels/terms'
import TxPanel      from './panels/tx'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  return (
    <Accordion defaultValue="details">
      <DetailsPanel data={data} />
      <FundsPanel data={data} />
      <SessionPanel data={data} />
      <TermsPanel data={data} />
      <TxPanel data={data} />
    </Accordion>
  )
}