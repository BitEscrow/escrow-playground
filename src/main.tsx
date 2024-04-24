import React         from 'react'
import ReactDOM      from 'react-dom/client'
import App           from './App'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'

import { BrowserRouter }   from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Notifications }   from '@mantine/notifications'
import { ClientProvider }  from '@/hooks/useClient'
import { SignerProvider }  from '@/hooks/useSigner'
import { ConfigProvider }  from '@/hooks/useConfig'
import { DraftProvider }   from '@/hooks/useDraft'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <BrowserRouter>
      <MantineProvider>
        <Notifications />
        <ConfigProvider>
          <ClientProvider>
            <SignerProvider>
              <DraftProvider>
                <App />
              </DraftProvider>
            </SignerProvider>
          </ClientProvider>
        </ConfigProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.Fragment>
)
