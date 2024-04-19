import { Buff }          from '@cmdcode/buff'
import { useSigner }     from '@/hooks/useSigner'
import { useDraftStore } from '@/hooks/useDraft'
import { DraftUtil }     from '@scrow/sdk/client'

import { useEffect, useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  Button,
  Space,
  Card
} from '@mantine/core'

import FormView      from '../DraftComponents/form'
import LinkView      from '../DraftComponents/link'


export default function () {

  const [ init, setInit ] = useState(false)
  
  const { signer } = useSigner()
  const [ params ] = useSearchParams()
  const draft      = useDraftStore()
  const encoded    = params.get('enc')
  const navigate   = useNavigate()

  const update_link = () => {
    try {
      const link = DraftUtil.encode(draft.data)
      navigate(`/draft/view?enc=${link}`)
    } catch {
      return
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
      <Button
        style={{
          backgroundColor: '#0068FD',
          borderRadius: '15px',
        }}
        maw = {150}
        variant="filled"
        onClick={() => update_link()}
      >
        Update Draft
      </Button>
    </Card>
  )
}
