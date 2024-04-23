import { Box, Space }   from '@mantine/core'
import { useSigner }    from '@/hooks/useSigner'
import { ContractData } from '@scrow/sdk'

import CommitForm from './commit'
import FundList   from './funds'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const { fund_pend, fund_value, status, tx_total } = data

  const { signer } = useSigner()

  const can_deposit = (signer !== null && status === 'published' && (fund_pend + fund_value) < tx_total)

  return (
    <Box>
      <FundList cid={data.cid} />
      
      { can_deposit && 
        <>
          <Space h={20} />
          <CommitForm contract={data} signer={signer} />
        </>
      }
    </Box>
  )
}
