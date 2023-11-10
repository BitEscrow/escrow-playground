import { useContract }  from '@/hooks/useContract'
import ContractMainView from './view'

interface Props {
  cid : string
}

export default function ContractView ({ cid } : Props) {
  const { data, error, isLoading } = useContract(cid)

  return (
    <>
      { error && <p>Error: {String(error)}</p> }
      { isLoading && <p>Loading...</p> }
      { data && <ContractMainView data={ data } /> }
    </>
  )
}
