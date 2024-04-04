import {
  ContractData
} from '@scrow/core'

import { Box, Tabs } from '@mantine/core'

import DetailsPanel    from './panels/details'
import WitnessPanel    from './panels/commits'
import JsonView        from './json'
import StatementsDetails from './panels/statements'
import FormDetails from './panels/form'

interface Props {
  data : ContractData
  view : string
}

export default function ({ data, view } : Props) {

  return (
    <Box mt={20} maw={700}>
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <DetailsPanel         data={data} />
          <StatementsDetails    data={data} />
          <FormDetails          data={data} />  
          <WitnessPanel         data={data} />
        </Tabs.Panel>

        <Tabs.Panel value="json">
          <JsonView data={data.vm_state} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}

