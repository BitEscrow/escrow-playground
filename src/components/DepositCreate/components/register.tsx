import { assert }            from '@scrow/sdk/util'
import { EscrowSigner }      from '@scrow/sdk'
import { useEffect }         from 'react'
import { useClient }         from '@/hooks/useClient'
import { useErrResToast }    from '@/hooks/useToast'
import { truncate_id }       from '@/lib/draft'
import { useContractUpdate } from '@scrow/hooks/contract'
import { useDepositUpdate }  from '@scrow/hooks/deposit'

import { Box, Code, Group, Loader, Stack, Text } from '@mantine/core'

import { DepositDispatch, DepositForm, DepositState } from '..'

interface Props {
  form     : DepositForm
  state    : DepositState
  setState : DepositDispatch
  signer   : EscrowSigner
}

export default function ({ form, state, setState, signer } : Props) {
  assert.exists(state.account)
  assert.exists(state.payment)

  const { client }  = useClient()
  const { feerate } = form.getValues()

  const cid = (state.contract !== null)
    ? truncate_id(state.contract.cid) 
    : 'null'

  const ct_update = useContractUpdate(client)
  const dp_update = useDepositUpdate(client)

  const utxo = state.payment.utxo

  useEffect(() => { register() }, [ state.payment ])

  const register = async () => {
    assert.exists(state.account)
    if (state.contract !== null) {
      const req = signer.account.commit(state.account, state.contract, feerate, utxo)
      const res = await client.account.commit(req)
      if (res.ok) {
        const dpid = res.data.deposit.dpid
        ct_update(cid, res.data.contract)
        dp_update(dpid, res.data.deposit)
        setState(e => { return { ...e, ...res.data } })
      } else {
        useErrResToast(res)
      }
    } else {
      const req = signer.account.register(state.account, feerate, utxo)
      const res = await client.account.register(req)
      if (res.ok) {
        const dpid = res.data.deposit.dpid
        dp_update(dpid, res.data.deposit)
        setState(e => { return { ...e, ...res.data } })
      } else {
        useErrResToast(res)
      }
    }
  }

  return (
    <Stack align='center' >

      <Box>
        <Group>
          <Text w={150} ff='monospace' ta='right' size='sm'>Deposit Address</Text>
          <Text>:</Text>
          <Code>{truncate_id(state.account.deposit_addr)}</Code>
        </Group>
        <Group>
          <Text w={150} ff='monospace' ta='right' size='sm'>Contract Id</Text>
          <Text>:</Text>
          <Code>{cid}</Code>
        </Group>
      </Box>

      <Group justify='center'>
        <Text>Registering deposit</Text>
        <Loader color="blue" type="dots" />
      </Group>

    </Stack>
  )
}