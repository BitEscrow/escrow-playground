import { createDraftStore } from '@scrow/hooks'

import {
  DraftUtil,
  ProposalData,
  RoleTemplate
} from '@scrow/sdk'

import CONFIG from '@/config/index.js'

const templ = Object.keys(CONFIG.presets)[0]

const { proposal, roles } = CONFIG.presets[templ as keyof typeof CONFIG.presets]

const defaults = DraftUtil.create(proposal as ProposalData, roles as RoleTemplate[])

export const { DraftProvider, useDraftStore } = createDraftStore(defaults)
