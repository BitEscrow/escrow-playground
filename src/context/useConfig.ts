import { createStore } from '@cmdcode/use-store'

export interface ConfigStore {
  host_url   : string
  oracle_url : string
}

const defaults : ConfigStore = {
  host_url   : 'http://localhost:3000',
  oracle_url : 'http://localhost:3300'
}

const session_key = 'config_store'

export const { 
  StoreProvider : ConfigProvider, 
  useStore      : useConfig
} = createStore({ defaults, session_key })
