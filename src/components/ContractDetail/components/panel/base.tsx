import { ContractData } from '@scrow/sdk/core'

import {
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
      <TextInput
        readOnly
        label="Moderator PubKey"
        value={data.moderator ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <TextInput
        readOnly
        label="Server Pubkey"
        value={data.server_pk ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <TextInput
        readOnly
        label="Server Signature"
        value={data.server_sig ?? 'N/A'}
        styles={{ input : { fontFamily : 'monospace' }}}
      />
      <Text size='sm'>Member Signatures</Text>
      <Stack gap={5}>
        {data.signatures.map((e) => (
          <TextInput
            readOnly
            ml     = {20}
            value  = {e} 
            styles = {{ input : { fontFamily : 'monospace' }}}
          />
        ))}
      </Stack>
    </Stack>
  )
}
