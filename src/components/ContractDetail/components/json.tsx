import { ContractData } from '@scrow/sdk/core'
import { JsonInput }    from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  return (
    <JsonInput
      formatOnBlur
      autosize
      mb={20}
      minRows={4}
      maxRows={25}
      value={JSON.stringify(data, null, 2)}
    />
  )
}
