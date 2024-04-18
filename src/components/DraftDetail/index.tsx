import { Buff }         from '@cmdcode/buff'
import { DraftSession } from '@scrow/sdk/client'
import { useSigner }    from '@/hooks/useSigner'

import { useEffect, useState } from 'react'

import {
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'

import {
  Card,
  Code,
  Divider,
  Text,
  Title
} from '@mantine/core'

import Room from './components/room'

export default function () {
  
  const { signer } = useSigner()
  
  const [ params ] = useSearchParams()
  const encoded    = params.get('enc')

  const [ draft, setDraft ] = useState<DraftSession | null>(null)

  const navigate = useNavigate()

  console.log('enc:', encoded)

  useEffect(() => {
    if (draft === null && encoded !== null) {
      const data = Buff.b64url(encoded).to_json()
      setDraft(data)
    }
  }, [ draft ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      
      <Title order={2} mb={15}>Draft Room</Title>

      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
        Negotiate on a contract proposal.
      </Text>

      <Divider mb={30} mt={20} />

      { draft !== null && <pre>{JSON.stringify(draft, null, 2)}</pre> }
      
      {/* { signer !== null && sid !== undefined
        && <Room secret={ sid } signer={ signer } /> 
        || <>
            <Center><Loader color="#0068FD" /></Center>
            <Button onClick={reload}>Reload</Button>
          </>
      } */}
    </Card>
  )
}
