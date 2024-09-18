import { createSignerStore } from '@bitescrow/hooks/signer'

import CONFIG from '@/config/index.js'

const network = CONFIG.settings.defaults.network
const config  = CONFIG.servers[network as keyof typeof CONFIG.servers]

export const { SignerProvider, useSigner } = createSignerStore(config)
