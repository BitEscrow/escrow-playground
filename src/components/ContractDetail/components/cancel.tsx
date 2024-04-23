import { useClient }    from '@/hooks/useClient'
import { ContractData } from '@scrow/sdk/core'
import { EscrowSigner } from '@scrow/sdk/client'

import { Button } from '@mantine/core'

interface Props {
  contract : ContractData
  signer   : EscrowSigner
}

export default function ({ contract, signer } : Props) {

  const { cid, moderator, status } = contract

  const { client } = useClient()

  const can_cancel = (
    (
      status === 'published' ||
      status === 'funded'    ||
      status === 'secured'
    ) && (
      moderator !== null &&
      signer.pubkey === moderator
    )
  )

  const cancel = async () => {
    const req = signer.contract.cancel(cid)
    const res = await client.contract.cancel(cid, req)
    if (!res.ok) throw new Error(res.error)
  }

  return (
    <Button
      variant='sublte'
      color='red'
      maw={'156px'}
      disabled={!can_cancel}
      onClick={cancel}
      style={{ borderRadius: '15px' }}
    >
      Cancel
    </Button>
  )
}
