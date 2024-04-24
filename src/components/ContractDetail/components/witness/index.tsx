import { useStatementList } from '@scrow/hooks'
import { Box, Loader }      from '@mantine/core'
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
  const { activated, closed, terms } = contract

  const { client } = useClient()
  const { signer } = useSigner()

  const { data, isLoading, update } = useStatementList(client, vmid, (activated && !closed))

  const can_submit = signer !== null && has_pubkey(terms.programs, signer.pubkey)

  return (
    <Box>
      { isLoading  && <Loader /> }
      { !isLoading && <StatementList data={data} host={client.server_url}/> }
      { can_submit && <SubmitForm contract={contract} signer={signer} update={update} /> }
    </Box>
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