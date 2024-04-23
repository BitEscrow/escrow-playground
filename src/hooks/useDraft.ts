import { createDraftStore } from '@scrow/hooks'

import {
  DraftUtil,
  ProposalData,
  RoleTemplate
} from '@scrow/sdk'

import CONFIG from '@/config/index.js'

const { proposal, roles } = CONFIG.presets['default']

const defaults = DraftUtil.create(proposal as ProposalData, roles as RoleTemplate[])

export const { DraftProvider, useDraftStore } = createDraftStore(defaults)
