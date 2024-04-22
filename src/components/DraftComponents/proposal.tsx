import { useDraftStore } from '@/hooks/useDraft'
import { useForm }       from '@mantine/form'
import { useEffect }     from 'react'
import { is_diff }       from '@/lib/util'

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
      title   : validate_title,
      content : validate_content,
      value   : validate_value
    },
    onValuesChange: (values) => {
      const { paths, payments, programs, schedule, ...rest } = prop.data
      if (is_diff(rest, values)) {
        console.log('update fired')
        prop.update(values)
      }
    }
  })

  useEffect(() => {
    const values = form.getValues()
    if (is_diff(prop.data, values)) {
      console.log('effect fired')
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

function validate_title (title : string) {
  if (typeof title !== 'string') {
    return 'Contract title must be a string!'
  } else if (title.length > 256) {
    return 'Contract title is too long!'
  } else if (title.length < 32) {
    return 'Contract title is too short!'
  } else if (!/^[a-zA-Z0-9\-_\s]+$/.test(title)) {
    return 'Contract title contains invalid characters!'
  } else {
    return null
  }
}

function validate_value (value : number) {
  if (typeof value !== 'number') {
    return 'Invalid value!'
  } else if (value > Number.MAX_SAFE_INTEGER) {
    return 'Contract value is too large.'
  } else if (value < 10000) {
    return 'Contract value must be a minimum of 10000 sats.'
  } else {
    return null
  }
}

function validate_content (content ?: string) {
  if (content === undefined) {
    return null
  } else if (typeof content !== 'string') {
    return 'Content value must be a string!'
  } else if (content.length > 4096) {
    return 'Contract title is too long!'
  } else {
    return null
  }
}