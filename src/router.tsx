import { useEffect }     from 'react'
import { Routes, Route } from 'react-router-dom'

import { useConfig }     from '@/hooks/useConfig'
import { useClient }     from '@/hooks/useClient'
import { useSigner }     from '@/hooks/useSigner'

import DraftCreate    from '@/components/DraftCreate'
import DraftEdit      from '@/components/DraftEdit'
import ContractDetail from '@/components/ContractDetail'
import ContractView   from '@/components/ContractView'
import DepositDetail  from '@/components/DepositDetail'
import DepositView    from '@/components/DepositView'
import SettingsView   from '@/components/settings'
import Error404View   from '@/components/ui/404'
import LandingView    from '@/components/Landing'
import DepostitCreate from './components/DepositCreate'

import CONFIG from '@/config/index.js'
import { parse_network } from '@scrow/sdk/util'


export default function () {


  const config = useConfig()
  const { update: update_client } = useClient()
  const { update: update_signer } = useSigner()

  useEffect(() => {
    const network = parse_network(config.store.network)
    const options = CONFIG.servers[network as keyof typeof CONFIG.servers]
    update_client(options)
    update_signer(options)
  }, [ config ])

  return (
    <Routes>
      <Route path="/"                   element={<LandingView    />} />
      <Route path="/contracts"          element={<ContractView   />} />
      <Route path="/contracts/:cid"     element={<ContractDetail />} />
      <Route path="/deposits"           element={<DepositView    />} />
      <Route path="/deposits/:dpid"     element={<DepositDetail  />} />
      <Route path="/deposit/new"        element={<DepostitCreate />} />
      <Route path="/draft/view"         element={<DraftEdit      />} />
      <Route path="/draft/new"          element={<DraftCreate    />} />
      <Route path="/settings"           element={<SettingsView   />} />
      <Route path="/*"                  element={<Error404View   />} />
    </Routes>
  )
}
