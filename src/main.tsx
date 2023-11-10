import React    from 'react'
import ReactDOM from 'react-dom/client'
import App      from './App'

import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { ConfigProvider }  from '@/context/useConfig'
import { MockProvider }    from '@/context/useMock'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <ConfigProvider>
        <MockProvider>
          <App />
        </MockProvider>
      </ConfigProvider>
    </MantineProvider>
  </React.StrictMode>
)
