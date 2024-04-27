import { Text }          from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { ErrorResponse } from '@scrow/sdk'

import { IconExclamationMark, IconX } from '@tabler/icons-react'

export function useErrorToast (
  title : string,
  error : string | unknown
) {
  if (error instanceof Error) {
    console.error(error)
    error = error.message
  }
  notifications.show({
    withCloseButton: true,
    autoClose: 5000,
    title   : <Text c='white'>{title}</Text>,
    message : <Text c='white'>{String(error)}</Text>,
    color: 'red',
    icon: <IconX />,
    style: { backgroundColor: 'red' },
  })
}

export function useErrResToast(res : ErrorResponse) {
  notifications.show({
    withCloseButton : true,
    autoClose       : 5000,
    title           : <Text c='white'>{res.status} Error</Text>,
    message         : <Text c='white'>{res.error}</Text>,
    color           : 'red',
    icon            : <IconExclamationMark />,
    style           : { backgroundColor: 'darkslateblue' },
  })
}