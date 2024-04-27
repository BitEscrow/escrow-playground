import { DraftUtil, ProposalData, RoleTemplate } from '@scrow/sdk'

import templates from './presets.json'  assert { type : 'json' }
import servers   from './servers.json'  assert { type : 'json' }
import settings  from './settings.json' assert { type : 'json' }

const presets = Object.keys(templates)

const preset_default  = templates[presets[0] as keyof typeof templates]
const default_session = DraftUtil.create(preset_default.proposal as ProposalData, preset_default.roles as RoleTemplate[])

export default { default_session, presets, servers, settings, templates }
