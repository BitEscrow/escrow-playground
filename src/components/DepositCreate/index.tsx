import {
    Card,
    Title,
    Text
} from '@mantine/core'

import AccountDetails from './components/account'
import Invoice from './components/invoice'


export default function DepostitCreate() {

  return (
      <Card maw={500}>
        <Title order={2} mb={15}>Create New Deposit</Title>
        <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Est officia tempor proident do tempor.
        </Text>
        <AccountDetails />
        <Invoice/>
    </Card>
  )
}
