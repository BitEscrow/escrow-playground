import { Box, Space }   from '@mantine/core'
import { ContractData } from '@scrow/sdk'

import FundAcct  from './deposit/account'
import FundList  from './deposit/funds'
import FundTally from './deposit/tally'
import { useSigner } from '@/hooks/useSigner'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  const { signer } = useSigner()

  return (
    <Box>
      <FundTally data={data} />
      <Space h={20} />
      <FundList cid={data.cid} />
      <Space h={20} />
      { signer !== null && <FundAcct contract={data} signer={signer} /> }
    </Box>
  )
}
