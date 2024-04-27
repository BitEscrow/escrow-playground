import { ContractData } from '@scrow/sdk/core'

import {
  NumberInput,
  Stack,
  Text,
  TextInput
} from '@mantine/core'

interface Props {
  data: ContractData
}

export default function ({ data }: Props) {

  return (
    <Stack>
      <NumberInput
        readOnly
        label="Transaction Base Size"
        value={data.tx_bsize}
      />
      <NumberInput
        readOnly
        label="Transaction Virtual Size"
        value={data.tx_vsize}
      />
      <TextInput
        readOnly
        label="Transaction Id"
        value={data.spent_txid ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <TextInput
        readOnly
        label="Transaction Hex"
        value={data.spent_txhex ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <Text size='sm'>Spending Paths</Text>
      <Stack gap={5}>
        {data.outputs.map((e) => (
          <TextInput
            readOnly
            key    = {e[0]}
            ml     = {20}
            label  = {e[0]}
            value  = {e[1]}
            styles = {{ input : { fontFamily : 'monospace' }}}
          />
        ))}
      </Stack>
    </Stack>
  )
}
