import { ContractData } from '@scrow/sdk/core'

import {
  Stack,
  TextInput
} from '@mantine/core'

interface Props {
  data: ContractData
}

/**
 * 
 * moderator
 * server_pk
 * server_sig
 */

export default function ({ data }: Props) {

  return (
    <Stack>
      <TextInput
        readOnly
        label="Engine"
        value={data.terms.engine}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <TextInput
        readOnly
        label="Machine Id"
        value={data.vmid ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <TextInput
        readOnly
        label="Current Head"
        value={data.active_head ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <TextInput
        readOnly
        label="Closing Output"
        value={data.closed_path ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
    </Stack>
  )
}

