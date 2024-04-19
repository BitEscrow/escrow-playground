import { Buff }          from '@cmdcode/buff'
import { useSigner }     from '@/hooks/useSigner'
import { useDraftStore } from '@/hooks/useDraft'
import { DraftUtil }     from '@scrow/sdk/client'

import { useEffect, useState }          from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { IconMail, IconRubberStamp }    from '@tabler/icons-react'

import {
  Button,
  Space,
  Card,
  Group,
  Divider
} from '@mantine/core'

import FormView   from '../DraftComponents/form'
import LinkView   from './components/link'
import SignerView from './components/signer'

export default function () {

  const [ init, setInit ] = useState(false)
  
  const { signer } = useSigner()
  const [ params ] = useSearchParams()
  const draft      = useDraftStore()
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
      const link = DraftUtil.encode(draft.data)
      navigate(`/draft/view?enc=${link}`)
    } catch {
      return
    }
  }

  const endorse_draft = () => {
    if (signer !== null) {
      draft.member.endorse(signer)
    }
  }

  const publish_draft = () => {
    if (signer !== null) {
      draft.member.endorse(signer)
    }
  }

  useEffect(() => {
    if (!init && encoded !== null) {
      const data = Buff.b64url(encoded).to_json()
      draft.update(data)
      setInit(true)
    }
  }, [ draft, encoded, init ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <LinkView />
      <Space h="xs" />
      <FormView />
      <Space h="xs" />
      { signer !== null && 
        <>
          <SignerView signer={signer} />
          <Divider mb={20} />
        </>
      }
      <Group>
        <Button
          style={{
            backgroundColor: '#0068FD',
            borderRadius: '15px',
          }}
          variant="filled"
          onClick={() => update_link()}
        >
          Update Draft
        </Button>
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
