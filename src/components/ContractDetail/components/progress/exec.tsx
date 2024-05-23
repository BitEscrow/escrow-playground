import { get_countdown_timer } from '@/lib/time'
import { ContractData }        from '@scrow/sdk'
import { now }                 from '@scrow/sdk/util'
import { useEffect, useState } from 'react'

import { Box, Code, Group, Stack, Text } from '@mantine/core'

import TimerProgress from '@/components/ui/TimerProgress'

interface Props {
  data : ContractData & { activated : true }
}

export default function ({ data } : Props) {
  const { activated, active_at, expires_at } = data

  const current = now()
  const remains = expires_at - current
  const message = get_countdown_timer(expires_at, current)

  const [ seconds, setSeconds ] = useState(remains)

  useEffect(() => {
    let interval : any = null
    if (activated && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000)
    } else if (!activated && seconds !== 0 && interval) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [ activated, seconds ])

  return (
    <Box>
      { activated && !closed && <TimerProgress start={active_at} end={expires_at} /> }
      <Group mt={15} justify='center'>
        <Stack gap={5}>
          <Group gap='xs' h={24} justify='flex-start'>
            <Text w={50}>Engine</Text>
            <Text>:</Text>
            <Code>{data.terms.engine}</Code>
          </Group>
          <Group gap='xs' h={24} justify='flex-start'>
            <Text w={50} >Output</Text>
            <Text>:</Text>
            <Code>{data.machine_vout ?? 'null'}</Code>
          </Group>
        </Stack>
        <Stack gap={5} justify='center'>
          <Group gap='xs' h={24} justify='flex-start'>
            <Text w={50} >Expires</Text>
            <Text>:</Text>
            <Code>{message}</Code>
          </Group>
          <Group gap='xs' h={24} justify='flex-start'>
            <Text w={50} >Status</Text>
            <Text>:</Text>
            <Code>{data.closed ? 'closed' : 'running'}</Code>
          </Group>
        </Stack>
      </Group>
    </Box>
    
  )
}