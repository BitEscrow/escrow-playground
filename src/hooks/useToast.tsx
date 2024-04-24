import { notifications } from '@mantine/notifications'
import { ErrorResponse } from '@scrow/sdk'
import { IconX }         from '@tabler/icons-react'

export function useErrorToast (
  title   : string,
  message : string
) {
  notifications.show({
    withCloseButton: true,
    autoClose: 5000,
    title,
    message,
    color: 'red',
    icon: <IconX />,
    style: { backgroundColor: 'red' },
  })
}

export function useErrResToast(res : ErrorResponse) {
  notifications.show({
    withCloseButton: true,
    autoClose: 5000,
    title : `${res.status} Error`,
    message : res.error,
    color: 'red',
    icon: <IconX />,
    style: { backgroundColor: 'red' },
  })
}