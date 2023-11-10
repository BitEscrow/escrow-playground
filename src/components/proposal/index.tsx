import { ProposalData } from '@scrow/core'
import { Card, Title }  from '@mantine/core'
import ProposalInfoView from './components/info'

interface Props {
  data : ProposalData
}

export default function ProposalView ({ data } : Props) {
  
  return (
    <Card>
      <Title order={2}>Proposal</Title>
      <ProposalInfoView data={ data } />
    </Card>
  )
}
