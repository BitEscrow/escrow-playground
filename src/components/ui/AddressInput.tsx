import { useSigner } from '@/hooks/useSigner'

import { TextInput, TextInputProps, Tooltip } from '@mantine/core'

import { IconReceiptBitcoin } from '@tabler/icons-react'

interface Props extends TextInputProps {
  account    : number
  index     ?: number
  format    ?: string 
  bgcolor   ?: string
  tooltip   ?: string
  onGenerate : (address : string) => void 
}

export default function ({ onGenerate, ...props }: Props) {

  const { signer } = useSigner()

  const can_gen = (signer !== null)

  const generate = () => {
    if (can_gen) {
      const { account, index = 0, format } = props
      const address = signer._wallet.get_account(account).new_address({ index, format })
      onGenerate(address)
    }
  }

  return (
    <TextInput
      placeholder='enter address'
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
