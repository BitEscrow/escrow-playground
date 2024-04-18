import { useEffect, useState }  from 'react'
import { useSigner } from '@/hooks/useSigner'

import {
  AccountData,
  ContractData,
  DepositData,
  OracleTxSpendData
} from '@scrow/sdk/core'

import { Box, Stepper, Text } from '@mantine/core'

import LockPayment     from './components/lock'
import PayAddress      from './components/pay'
import RegisterPayment from './components/register'
import RequestAccount  from './components/request'

// There is an issue of losing the account after making the deposit.
// There should be an account page that stores the address in the url.
// The deposit details page should request an account, then forward to account page.

export default function () {

  const query  = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(query.entries())

  const { signer } = useSigner()

  const [ active,   setActive   ] = useState(1)
  const [ account,  setAccount  ] = useState<AccountData>()
  const [ payment,  setPayment  ] = useState<OracleTxSpendData>()
  const [ deposit,  setDeposit  ] = useState<DepositData>()
  const [ contract, setContract ] = useState<ContractData>()

  useEffect(() => {
    if (active < 2 && account !== undefined) {
      setActive(2)
    } else if (active < 3 && payment !== undefined) {
      setActive(3)
    } else if (active < 4 && deposit !== undefined) {
      setActive(4)
    } else if (active < 5 && contract !== undefined) {
      setActive(5)
    }
  }, [ active, account, payment, deposit, contract ])

  return (
    <Box>
      { signer === null && <Text>Please sign in to continue.</Text>}
      { signer !== null &&
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Account" description="Request an account">
            <RequestAccount params={params} setAccount={setAccount} signer={signer} />
          </Stepper.Step>
          <Stepper.Step label="Payment" description="Make a payment">
            { account &&
              <PayAddress account={account} setPayment={setPayment} />
            }
          </Stepper.Step>
          <Stepper.Step label="Register" description="Register payment">
            { account && payment &&
              <RegisterPayment account={account} deposit={deposit} payment={payment} setDeposit={setDeposit} />
            }
          </Stepper.Step>
          <Stepper.Step label="Commit" description="Lock funds to Contract">
            { deposit &&
              <LockPayment
                cid         = {params.cid} 
                deposit     = {deposit}
                setContract = {setContract}
                signer      = {signer}
              />
            }
          </Stepper.Step>
          <Stepper.Completed>
            Completed, contract is funded.
          </Stepper.Completed>
        </Stepper>
      }
    </Box>
  )
}
