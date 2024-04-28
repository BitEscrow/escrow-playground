import { Group, SegmentedControl, Stepper }  from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

interface Props {
  step : number
}

export default function ({ step } : Props) {
  const breakpoint = useMediaQuery('(min-width: 580px)')

  return (
    <Group justify='center' mb={20}>
      { breakpoint &&
        <Stepper active={step} mx={20} iconSize={32} >
          <Stepper.Step label="Reserve" description="Reserve Account"/>
          <Stepper.Step label="Deposit"  description="Deposit Funds"/>
          <Stepper.Step label="Register" description="Register Deposit"/>
        </Stepper>
      }
      { !breakpoint &&
        <SegmentedControl
          value={get_segment(step)}
          data={[ 'Reserve', 'Deposit', 'Register', 'Completed' ]}
        />
      }
    </Group>
  )
}

function get_segment (step : number) {
  switch (step) {
    case 0:
      return 'Reserve'
    case 1:
      return 'Deposit'
    case 2:
      return 'Register'
    case 3:
      return 'Completed'
    default:
      return 'Error'
  }
}
