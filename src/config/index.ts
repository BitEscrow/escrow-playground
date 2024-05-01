import { DraftTemplate, DraftUtil } from '@scrow/sdk'

import templates from './presets.json'  assert { type : 'json' }
import servers   from './servers.json'  assert { type : 'json' }
import settings  from './settings.json' assert { type : 'json' }

const presets = Object.keys(templates)

const preset_default  = templates[presets[0] as keyof typeof templates]
const default_session = DraftUtil.create(preset_default as DraftTemplate)

export default { default_session, presets, servers, settings, templates }
