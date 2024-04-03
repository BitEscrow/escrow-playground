import { useState }        from 'react'
import { useNavigate }     from 'react-router-dom'
import { useClickOutside, useScrollIntoView } from '@mantine/hooks'
import { useClient }       from '@scrow/hooks'
import { now }             from '@scrow/core/util'

import {
  ContractData,
  EscrowSigner
} from '@scrow/core'

import { Box, Button, Collapse, Group, NumberInput, Text } from '@mantine/core'

import {
  IconBox,
  IconCoins,
} from '@tabler/icons-react'

interface Props {
  data   : ContractData
  signer : EscrowSigner
}

export default function ({ data, signer } : Props) {

  const [ lock, setLock ] = useState(60 * 60 * 48)
  const [ view, setView ] = useState('') 

  const navigate = useNavigate()

  const { client } = useClient()

  const ref = useClickOutside(() => setView(''))

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60
  })

  const set_view = (view : string) => {
    setView(view)
    scrollIntoView({ alignment: 'center'})
  }

  const can_cancel = (
    (
      data.status === 'published' ||
      data.status === 'funded'    ||
      data.status === 'secured'
    ) && (
      data.moderator !== null &&
      signer.pubkey === data.moderator
    )
  )

  const can_deposit = (
    data.status === 'published' && 
    (data.pending + data.balance) < data.total
  )

  const can_submit = (
    data.status === 'active' &&
    data.vm_state !== null
  )

  const cancel = async () => {
    const req = signer.request.contract_cancel(data.cid)
    const res = await client.contract.cancel(data.cid, req)
    if (!res.ok) throw new Error(res.error)
  }

  const load_acct = async () => {
    const pub = signer.pubkey
    const idx = now()
    navigate(`/account?cid=${data.cid}pub=${pub}&lock=${lock}&idx=${idx}`)
  }

  const load_vm = () => {
    navigate(`/contracts/${data.cid}/vm`)
  }

  return (
    <Box ref={ref} mt={30}>
      <Group mt={10}>
        <Button
          variant='sublte'
          color='red'
          maw={'156px'}
          disabled={!can_cancel}
          onClick={() => set_view('cancel')}
          style={{ flex : 1, borderRadius: '15px' }}
        >
          Cancel
        </Button>
        <Button
          leftSection={<IconCoins size={14}/>}
          maw={'156px'}
          disabled={!can_deposit}
          onClick={() => set_view('deposit')}
          style={{ flex : 1, borderRadius: '15px' }}
        >
          Deposit
        </Button>
        <Button
          leftSection={<IconBox size={14}/>}
          maw={'156px'}
          disabled={!can_submit}
          onClick={() => set_view('submit')}
          style={{ flex : 1, borderRadius: '15px', backgroundColor: 'black' }}
        >
          Open VM
        </Button>
      </Group>
      <Collapse in={view === 'cancel'}>

      </Collapse>
      <Collapse in={view === 'deposit'}>
        <Text mt={20}>Request a time-locked deposit account from the Provider:</Text>
        <NumberInput
          description="The length of time (in seconds) your deposit will be in escrow."
          value={lock}
          onChange={(e) => setLock(Number(e))}
        />
        <Button mt={10} onClick={load_acct}>Request Account</Button>
      </Collapse>
      <Collapse in={view === 'submit'}>

      </Collapse>
      <div ref={targetRef}></div>
    </Box>
  )
}
