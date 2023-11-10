import useSWR           from 'swr'
import { ContractData } from '@scrow/core'
import { fetcher }      from '@/lib/fetcher'
import { useConfig }    from '@/context/useConfig'

export function useContract (cid : string) {
  const { store } = useConfig()

  const url = `${store.host_url}/api/contract/${cid}`

  const { data, error, isLoading } = useSWR<ContractData>(url, fetcher)

  return { data, error, isLoading }
}
