import { useSigner } from '@/hooks/useSigner'
import { truncate_id } from '@/lib/draft'

import { TextInput, TextInputProps, Tooltip } from '@mantine/core'

import { IconReceiptBitcoin } from '@tabler/icons-react'

interface Props extends TextInputProps {
  account    : number
  data      ?: string[]
  index     ?: number
  format    ?: string 
  bgcolor   ?: string
  tooltip   ?: string
  onGenerate : (address : string) => void 
}

export default function ({ onGenerate, value, data = [], ...props }: Props) {

  const { signer } = useSigner()

  const can_gen = (signer !== null)

  const index = (props.index !== undefined)
    ? props.index
    : (signer !== null)
      ? data.filter(e => signer.wallet.has(props.account, e)).length
      : 0

  const generate = () => {
    if (can_gen) {
      const { account, format } = props
      const address = signer.wallet.get(account, { index, format })
      onGenerate(address)
    }
  }

  return (
    <TextInput
      placeholder='enter address'
      value={truncate_id(String(value))}
      rightSectionWidth={60}
      rightSection={
        <>
          { signer &&
            <Tooltip label={props.tooltip ?? 'Add Bitcoin Address'}>
              <IconReceiptBitcoin onClick={generate}
            />
            </Tooltip>
          }
        </>
      }
      { ...props }
    />
  )
}
