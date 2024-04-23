import { create_provider } from '@cmdcode/use-store'
import { Network }         from '@scrow/sdk/core'

import CONFIG from '@/config/index.js'

export interface ConfigStore {
  network : Network
}

const defaults  = CONFIG.settings.defaults
const store_key = 'config'

// const middleware = (store : StoreAPI<DemoStore>) => {
//   const say_hello = () => console.log('hello world!')
//   return { ...store, say_hello }
// }

export const {
  StoreProvider : ConfigProvider,
  useStore      : useConfig
} = create_provider({ defaults, store_key })
