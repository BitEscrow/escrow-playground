// Progress bar for contract execution

import TimerProgress    from '@/components/ui/TimerProgress'
import { ContractData } from '@scrow/sdk'

// Should show progress of running, from created to now, to expiration.
// Should change from running to closed based on status
// Should also show current output, current hash, current stamp

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  return (
    <>
      { data.activated && <TimerProgress start={data.active_at} end={data.expires_at} /> }
    </>
    
  )
}