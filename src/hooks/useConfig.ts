import { create_provider } from '@cmdcode/use-store'
import { ChainNetwork }         from '@scrow/sdk/core'
import CONFIG              from '@/config/index.js'

export interface ConfigStore {
  network : ChainNetwork
}

const defaults  = CONFIG.settings.defaults
const store_key = 'playground_config'

export const {
  StoreProvider : ConfigProvider,
  useStore      : useConfig
} = create_provider({ defaults, store_key })
