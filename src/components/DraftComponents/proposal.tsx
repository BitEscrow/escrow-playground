import { useDraftStore } from '@/hooks/useDraft'
import { useForm }       from '@mantine/form'
import { useEffect }     from 'react'
import { is_diff }       from '@/lib/util'

import * as util from '@/lib/draft.js'

import {
  Accordion, Box,
} from '@mantine/core'

import InfoForm    from './proposal/info'
import PathForm    from './proposal/paths'
import PaymentForm from './proposal/payments'
import ProgramForm from './proposal/programs'
import TaskForm    from './proposal/tasks'
import TermsForm   from './proposal/terms'

import {
  IconRoute,
  IconCoins,
  IconPrompt,
  IconList,
  IconClockHour4,
} from '@tabler/icons-react'

export default function () {

  const draft  = useDraftStore()
  const prop   = draft.proposal

  const form   = useForm({
    initialValues : prop.data,
    validateInputOnChange: true,
    validate : {
      title   : util.validate_title,
      content : util.validate_content,
      value   : util.validate_value
    },
    onValuesChange: (values) => {
      const { paths, payments, programs, schedule, ...rest } = prop.data
      const fixed = util.rem_empty_strings(values)
      if (is_diff(fixed, rest)) {
        prop.update(fixed)
      }
    }
  })

  useEffect(() => {
    const values = form.getValues()
    if (is_diff(prop.data, values)) {
      form.setInitialValues(prop.data)
      form.setValues(prop.data)
    }
  }, [ prop.data ])

  return (
    <Box>
      <InfoForm form={form}/>
      <Accordion mt="xs">
        <Accordion.Item key="paths" value="paths">
          <Accordion.Control icon={<IconRoute size={18}/>}>Paths</Accordion.Control>
          <Accordion.Panel>
            <PathForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="payments" value="payments">
          <Accordion.Control icon={<IconCoins size={18}/>}>Payments</Accordion.Control>
          <Accordion.Panel>
            <PaymentForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="programs" value="programs">
          <Accordion.Control icon={<IconPrompt size={18}/>}>Programs</Accordion.Control>
          <Accordion.Panel>
            <ProgramForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="tasks" value="tasks">
          <Accordion.Control icon={<IconClockHour4 size={18}/>}>Tasks</Accordion.Control>
          <Accordion.Panel>
            <TaskForm />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="terms" value="terms">
          <Accordion.Control icon={<IconList size={18}/>}>Terms</Accordion.Control>
          <Accordion.Panel>
            <TermsForm form={form} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  )
}
