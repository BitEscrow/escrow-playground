import { DraftUtil, ProposalData, RoleTemplate } from '@scrow/sdk'

import templates from './presets.json'  assert { type : 'json' }
import servers   from './servers.json'  assert { type : 'json' }
import settings  from './settings.json' assert { type : 'json' }

const presets = Object.keys(templates)

const preset_default   = templates[presets[0] as keyof typeof templates]
const proposal_default = preset_default.proposal as ProposalData
const roles_default    = preset_default.roles as RoleTemplate[]
const default_session  = DraftUtil.create(proposal_default, roles_default)

export default { default_session, presets, servers, settings, templates }
