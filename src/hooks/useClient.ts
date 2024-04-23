import { createClientStore } from '@scrow/hooks/client'

import CONFIG from '@/config/index.js'

const network = CONFIG.settings.defaults.network
const config  = CONFIG.servers[network as keyof typeof CONFIG.servers]

export const { ClientProvider, useClient } = createClientStore(config)
