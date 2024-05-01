import { useSigner }       from '@/hooks/useSigner'
import { DraftUtil }       from '@scrow/sdk/client'
import { useClient }       from '@/hooks/useClient'
import { parse_err }       from '@scrow/sdk/util'
import { useDraftStore }   from '@scrow/hooks'
import { useWindowScroll } from '@mantine/hooks'
import CONFIG              from '@/config/index.js'

import { useErrResToast, useErrorToast } from '@/hooks/useToast'
import { useEffect, useState }           from 'react'
import { useNavigate, useSearchParams }  from 'react-router-dom'

import {
  IconArmchair,
  IconMail,
  IconRubberStamp,
  IconUsers
} from '@tabler/icons-react'

import {
  Button,
  Space,
  Card,
  Group,
  Tabs,
  Title,
  Text
} from '@mantine/core'

import DraftHeader  from '../DraftComponents/header'
import FormView     from '../DraftComponents'
import JsonView     from '../DraftComponents/json'
import TabulateView from '../DraftComponents/totals'
import LinkView     from './components/link'
import MemberView   from './components/members'
import SeatView     from './components/seats'

export default function () {
  const [ init, setInit ] = useState(false)
  const [ view, setView ] = useState('fields')
  const [ _, scrollTo ]   = useWindowScroll()
  
  const { client } = useClient()
  const { signer } = useSigner()
  const [ params ] = useSearchParams()
  const encoded    = params.get('enc')

  const session    = (encoded!== null)
    ? DraftUtil.decode(encoded)
    : CONFIG.default_session
    
  const draft      = useDraftStore(session)
  const tabs       = draft.tabulate()
  const navigate   = useNavigate()

  const can_endorse = (
    signer !== null &&
    draft.is_filled &&
    !signer.draft.is_signed(draft.data)
  )

  const can_publish = (
    signer !== null &&
    draft.is_filled &&
    draft.is_endorsed
  )

  const path_total  = tabs.proposal.path_total
  const pay_total   = tabs.proposal.pay_total
  const total_value = path_total + pay_total

  const update_link = () => {
    try {
      draft.verify()
      const link = DraftUtil.encode(draft.data)
      navigate(`/draft/view?enc=${link}`)
    } catch (err) {
      const msg = parse_err(err)
      useErrorToast('Error Updating Link', msg)
    }
  }

  const endorse_draft = () => {
    if (signer !== null) {
      try {
        draft.member.endorse(signer)
        update_link()
      } catch (err) {
        useErrorToast('Error Endorsing Draft', err)
      }
    }
  }

  const publish_draft = async () => {
    if (signer !== null) {
      const req = draft.publish()
      const res = await client.contract.create(req)
      if (res.ok) {
        const cid = res.data.contract.cid
        console.log('cid:', cid)
        navigate(`/contract/${cid}`)
      } else {
        useErrResToast(res)
      }
    }
  }

  useEffect(() => {
    if (!init && encoded !== null) {
      try {
        const dec = DraftUtil.decode(encoded)
        DraftUtil.verify(dec)
        draft.restore(dec)
        setInit(true)
        scrollTo({ y: 0 })
      } catch (err) {
        useErrorToast('Error Importing Draft', err)
      }
    }
  }, [ init, encoded ])

  useEffect(() => {
    if (total_value !== draft.proposal.data.value)
    draft.proposal.update({ value : total_value })
  }, [ draft ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <DraftHeader
        setView={setView}
        title={<Title order={2} mb={15}>Negotiate Draft</Title>}
        desc={<Text>Share and update this draft with other contract members.</Text>}
      />
      <LinkView draft={draft} />
      <Space h="xs" />
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <FormView draft={draft} />
        </Tabs.Panel>
        <Tabs.Panel value="json">
          <JsonView draft={draft} />
        </Tabs.Panel>
      </Tabs>
      <Tabs defaultValue="seats" mb={10}>
        <Tabs.List grow w='100%' mb={20}>
          <Tabs.Tab leftSection={<IconUsers size={18}/>} value="members">Members</Tabs.Tab>
          <Tabs.Tab leftSection={<IconArmchair size={18}/>} value="seats">Seats</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="members">
            <MemberView draft={draft} />
          </Tabs.Panel>
        <Tabs.Panel value="seats">
          <SeatView draft={draft} />
        </Tabs.Panel>
      </Tabs>
      <TabulateView path_total={path_total} pay_total={pay_total} total_value={total_value} />
      <Group>
        <Button 
          disabled={!can_endorse}
          style={{ borderRadius: '15px' }}
          leftSection={<IconRubberStamp size={14}/>}
          onClick={() => endorse_draft()}
        >
          Endorse
        </Button>
        <Button
          disabled={!can_publish}
          style={{ borderRadius: '15px' }}
          leftSection={<IconMail size={14}/>}
          onClick={() => publish_draft()}
        >
          Publish
        </Button>
      </Group>
    </Card>
  )
}
