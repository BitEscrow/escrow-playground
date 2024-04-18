import { useSigner }    from '@/hooks/useSigner'
// import { DraftSession } from '@scrow/sdk/core'

import {
  useEffect,
  useState
} from 'react'

export default function () {

  const store = useSigner()

  const [ draftId, setId ]      = useState<string | null>(null)
  const [ relay, setRelay ]     = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('id') && params.has('relay')) {
      setId(params.get('id'))
      setRelay(params.get('relay'))
    }
  }, [ draftId, relay ])

  return (
    <>
      { store.signer === null &&
        <p>Please login to a signing device to view this draft.</p>
      }
    </>
  )
}
