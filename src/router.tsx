import { Routes, Route } from 'react-router-dom'

import AccountView    from '@/components/AccountView'
import DraftCreate    from '@/components/DraftCreate'
import DraftDetail    from '@/components/DraftDetail'
import ContractDetail from '@/components/ContractDetail'
import ContractView   from '@/components/ContractView'
import DepositDetail  from '@/components/DepositDetail'
import DepositView    from '@/components/DepositView'
import SettingsView   from '@/components/settings'
import Error404View   from '@/components/ui/404'
import LandingView    from '@/components/Landing'
import CVMView        from '@/components/CVMView'
import DepostitCreate from './components/DepositCreate'

export default function () {

  return (
    <Routes>
      <Route path="/"                   element={<LandingView    />} />
      <Route path="/account"            element={<AccountView    />} />
      <Route path="/contracts"          element={<ContractView   />} />
      <Route path="/contracts/:cid"     element={<ContractDetail />} />
      <Route path="/contracts/:cid/vm"  element={<CVMView        />} />
      <Route path="/deposits"           element={<DepositView    />} />
      <Route path="/deposits/:dpid"     element={<DepositDetail  />} />
      <Route path="/deposit/new"        element={<DepostitCreate/>}  />
      <Route path="/draft/view"         element={<DraftDetail    />} />
      <Route path="/draft/new"          element={<DraftCreate    />} />
      <Route path="/settings"           element={<SettingsView   />} />
      <Route path="/*"                  element={<Error404View   />} />
    </Routes>
  )
}
