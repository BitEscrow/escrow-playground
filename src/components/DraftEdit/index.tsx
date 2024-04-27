import { useSigner }     from '@/hooks/useSigner'
import { DraftUtil }     from '@scrow/sdk/client'
import { useClient }     from '@/hooks/useClient'
import { parse_err }     from '@scrow/sdk/util'
import { useDraftStore } from '@scrow/hooks'
import CONFIG            from '@/config/index.js'

import { useErrResToast, useErrorToast } from '@/hooks/useToast'
import { useEffect, useState }           from 'react'
import { useNavigate, useSearchParams }  from 'react-router-dom'
import { IconMail, IconRubberStamp }     from '@tabler/icons-react'

import {
  Button,
  Space,
  Card,
  Group,
  Tabs,
  Title,
  Text
} from '@mantine/core'

import DraftHeader from '../DraftComponents/header'
import FormView    from '../DraftComponents'
import JsonView    from '../DraftComponents/json'
import LinkView    from './components/link'
import SeatView    from './components/seats'

export default function () {
  const [ init, setInit ] = useState(false)
  const [ view, setView ] = useState('fields')
  
  const { client } = useClient()
  const { signer } = useSigner()
  const [ params ] = useSearchParams()
  const draft      = useDraftStore(CONFIG.default_session)
  const encoded    = params.get('enc')
  const navigate   = useNavigate()

  const can_endorse = (
    signer !== null &&
    signer.draft.is_member(draft.data)  &&
    !signer.draft.is_signed(draft.data) &&
    draft.is_filled
  )

  const can_publish = (
    signer !== null &&
    draft.is_filled &&
    draft.is_endorsed
  )

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
        console.log('endorse:', draft.data)
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
        navigate(`/contracts/${cid}`)
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
        console.log('dec:', dec)
        draft.set(dec)
        console.log(draft.data)
        setInit(true)
      } catch (err) {
        useErrorToast('Error Importing Draft', err)
      }
    }
  }, [ encoded ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <DraftHeader setView={setView}>
        <>
          <Title order={2} mb={15}>Negotiate Draft</Title>
          <Text>Share and update this draft with other contract members.</Text>
        </>
      </DraftHeader>
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
      <Space h="xs" />
      { signer !== null && <SeatView draft={draft} signer={signer} /> }
      <Space h="xl" />
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
