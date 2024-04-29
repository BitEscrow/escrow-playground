import { ContractData }    from '@scrow/sdk/core'
import { Fieldset, Stack } from '@mantine/core'

import HashInput from '@/components/ui/HashInput'

interface Props {
  data: ContractData
}

export default function ({ data }: Props) {

  return (
    <Stack>
      <HashInput
        label="Moderator PubKey"
        description="The public key of the moderator's signing agent."
        value={data.moderator ?? 'N/A'}
      />
      <HashInput
        label="Server Pubkey"
        description="The public key of the server's signing agent."
        value={data.server_pk ?? 'N/A'}
      />
      <HashInput
        label="Server Signature"
        description="The server's signature endorsement of the contract (cid) hash."
        value={data.server_sig ?? 'N/A'}
      />
      <Fieldset my={10} legend="Member Endorsements">
        { data.signatures.map((e) => <HashInput mb={10} key = {e} value = {e} />)}
      </Fieldset>
    </Stack>
  )
}
