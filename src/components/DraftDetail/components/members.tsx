import { EscrowSigner }  from '@scrow/sdk/client'
import { useDraftStore } from '@/hooks/useDraft'

import {
  JsonInput,
  Stack
} from '@mantine/core'

interface Props {
  signer : EscrowSigner
}

export default function (props : Props) {

  const draft = useDraftStore()

  return (
    <Stack>
      { draft.data.members.map((e) => (
        <JsonInput
          autosize
          key={e.pub} 
          value={JSON.stringify(e, null, 2)}
        />
      ))}
    </Stack>
  )
}
