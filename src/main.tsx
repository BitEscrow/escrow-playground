import React         from 'react'
import ReactDOM      from 'react-dom/client'
import App           from './App'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import { BrowserRouter }   from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { ClientProvider }  from '@scrow/hooks/client'
import { SignerProvider }  from '@/hooks/useSigner'
import { ConfigProvider }  from '@/hooks/useConfig'
import { DraftProvider }   from './hooks/useDraft'
import { servers }         from './config'

import { ProposalData } from '@scrow/sdk/core'
import { DraftUtil, RoleTemplate } from '@scrow/sdk/client'
import presets_json from './presets.json' assert { type: 'json' }

const config = servers['mutiny']
const { proposal, roles } = presets_json['default']
const draft = DraftUtil.create(proposal as ProposalData, roles as RoleTemplate[])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <BrowserRouter>
      <MantineProvider>
        <ConfigProvider>
          <ClientProvider config={config}>
            <SignerProvider config={config}>
              <DraftProvider defaults={draft}>
                <App />
              </DraftProvider>
            </SignerProvider>
          </ClientProvider>
        </ConfigProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.Fragment>
)
