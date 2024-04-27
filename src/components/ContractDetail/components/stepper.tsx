import { ContractData }   from '@scrow/sdk'
import { Stepper }        from '@mantine/core'
import { useMediaQuery }  from '@mantine/hooks'
import { get_enum_state } from '@/lib/contract'

interface Props {
  contract : ContractData
}

export default function ({ contract } : Props) {
  const breakpoint = useMediaQuery('(min-width: 650px)')
  const enum_state = get_enum_state(contract)

  return (
    <Stepper active={enum_state} mx={20} orientation={breakpoint ? 'horizontal' : 'vertical'}  styles={{ separator : { width : 10 }}}>
      <Stepper.Step label="Funding"    description={get_fund_status(contract)} />
      <Stepper.Step label="Execution"  description={get_engine_status(contract)} />
      <Stepper.Step label="Settlement" description={get_settlement_status(contract)} />
    </Stepper>
  )
}

function get_fund_status (contract : ContractData) {
  const { canceled, canceled_at, deadline_at, fund_value, fund_pend, tx_total } = contract
  const fund_total = fund_value + fund_pend
  if (canceled) {
    return 'contract canceled'
  } else if (fund_value >= tx_total) {
    return 'contract paid'
  } else if (fund_total >= tx_total) {
    return 'confirming funds'
  } else if (canceled && canceled_at >= deadline_at) {
    return 'funding expired'
  } else {
    return 'awaiting funds'
  }
}

function get_engine_status (contract : ContractData) {
  const { activated, closed, closed_at, closed_path, expires_at } = contract
  if (closed && closed_path) {
    return 'contract closed'
  } else if (activated && closed && closed_at >= expires_at) {
    return 'contract expired'
  } else if (activated && closed) {
    return 'contract closed'
  } else if (activated) {
    return 'contract active'
  } else {
    return ''
  }
}

function get_settlement_status (contract : ContractData) {
  const { settled, spent, closed, closed_path } = contract
  if (settled) {
    return 'contract settled'
  } else if (spent) {
    return 'tx broadcast'
  } else if (closed && closed_path !== null) {
    return 'preparing tx'
  } else if (closed) {
    return 'funds released'
  } else {
    return ''
  }
}