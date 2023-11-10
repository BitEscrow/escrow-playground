
import { useState } from 'react'

import { AppShell, NavLink } from '@mantine/core'

import { useMock }  from '@/context/useMock'

import ProposalView from '@/components/proposal'
import ContractView from '@/components/contract'

export default function AppDemo() {
  const { store } = useMock()

  const [ view, setView ] = useState('proposal')

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm'
      }}
      padding="md"
    >
      <AppShell.Header>
        <div>BitEscrow Demo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="proposal" onClick={ () => setView('proposal') }/>
        <NavLink label="contract" onClick={ () => setView('contract') }/>
        <NavLink label="deposits" onClick={ () => setView('deposits') }/>
        <NavLink label="vm"       onClick={ () => setView('vm')       }/>
      </AppShell.Navbar>

      <AppShell.Main>
        { view === 'proposal' && <ProposalView data={ store.proposal }/> }
        { view === 'contract' && <ContractView cid={ store.cid }      /> }
        { view === 'deposits' && <p>Deposit demo goes here.</p> }
        { view === 'vm' && <p>CVM demo goes here.</p> }
      </AppShell.Main>

    </AppShell>
  )
}