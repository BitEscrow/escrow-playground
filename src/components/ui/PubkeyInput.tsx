import { useSigner } from '@/hooks/useSigner'

import { TagsInput, TagsInputProps, Tooltip } from '@mantine/core'

import { IconKey } from '@tabler/icons-react'

interface Props extends TagsInputProps {
  iconColor  ?: string
  timeout    ?: number
  tooltip    ?: string
  onClickAdd ?: (pubkey : string) => void
}

export default function ({ iconColor, timeout, tooltip, onClickAdd, ...props } : Props) {

  const { signer } = useSigner()

  const key_included = (
    (signer !== null && Array.isArray(props.value)) && 
    props.value.includes(signer.pubkey)
  )

  const can_add = (
    (signer !== null && !key_included) && 
    typeof onClickAdd === 'function'
  )

  const add_pubkey = () => {
    if (can_add) {
      onClickAdd(signer.pubkey)
    }
  }
  
  return (
    <TagsInput
      placeholder='enter pubkey'
      rightSectionWidth={can_add ? 60 : 0}
      rightSection={
        <>
          { can_add &&
            <Tooltip label={tooltip ?? 'Add Pubkey'} onClick={add_pubkey}>
              <IconKey color={iconColor} />
            </Tooltip>
          }
        </>
      }
      { ...props }
    />
  )
}