import { Text }      from '@mantine/core'
import { ReactNode } from 'react'

interface Props {
  children : ReactNode
}

export default function ({ children } : Props) {
  return (
    <Text bg='gray' p={5} fs='italic' ta='center' ff='monospace' mb={30} c='white' size='sm'>{children}</Text>
  )
}
