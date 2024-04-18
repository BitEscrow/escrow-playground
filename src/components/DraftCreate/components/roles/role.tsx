import { useForm } from '@mantine/form'

import {
  DraftSession,
  RolePolicy
} from '@scrow/sdk/client'

import {
  Dispatch,
  SetStateAction
} from 'react'

import { Box, TextInput } from '@mantine/core'


interface Props {
  role    : RolePolicy
  index   : number
  setData : Dispatch<SetStateAction<DraftSession>>
}

export default function ({ role, index, setData }: Props) {

  const form = useForm({
    initialValues : {
      title : '',
      min   : 0,
      max   : 1
    }
  })

  function update () {
    setData((data) => {
      const roles   = data.roles.filter(e => e.id !== role.id)
      const updated = form.values
      return { ...data, roles : [ roles, form.values]}}
    })
  }

  return (
    <Box>
      <TextInput
      
      />
    </Box>
  )
}
