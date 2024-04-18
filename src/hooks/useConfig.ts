import { createStore } from '@cmdcode/use-store'
import { Network }     from '@scrow/sdk/core'
import { settings }    from '@/config'

export interface ConfigStore {
  network : Network
  relay   : string
}

const session_key = 'config'

// const middleware = (store : StoreAPI<DemoStore>) => {
//   const say_hello = () => console.log('hello world!')
//   return { ...store, say_hello }
// }

export const {
  StoreProvider : ConfigProvider,
  useStore      : useConfig
} = createStore({ defaults : settings, session_key })
