import { useReceiptList }   from '@scrow/hooks'
import { Loader, Stack }    from '@mantine/core'
import { useClient }        from '@/hooks/useClient'
import { useSigner }        from '@/hooks/useSigner'

import { ContractData, ProgramEntry } from '@scrow/sdk'

import StatementList from './statements'
import SubmitForm    from './submit'

interface Props {
  contract : ContractData
  vmid     : string
}

export default function ({ contract, vmid } : Props) {
  const { terms }  = contract
  const { client } = useClient()
  const { signer } = useSigner()

  const { data, isLoading, update } = useReceiptList(client, vmid)

  const can_submit = (
    signer !== null                          && 
    (contract.activated && !contract.closed) &&
    has_pubkey(terms.programs, signer.pubkey)
  )

  return (
    <Stack>
      { can_submit && <SubmitForm contract={contract} signer={signer} update={update} /> }
      { isLoading  && <Loader /> }
      { !isLoading && <StatementList data={data} host={client.server_url} can_submit={can_submit} /> }
    </Stack>
  )
}

function has_pubkey (
  programs : ProgramEntry[],
  pubkey   : string
) {
  for (const prog of programs) {
    if (prog.includes(pubkey)) {
      return true
    }
  }
  return false
}