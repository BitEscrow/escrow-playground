import { useDraftStore } from '@/hooks/useDraft'
import { useForm }       from '@mantine/form'

import { IconPlus, IconTrash } from '@tabler/icons-react'

import {
  Box,
  Button,
  Fieldset,
  TagsInput,
  TextInput,
  Group,
  ActionIcon,
  Text,
  NumberInput,
  Stack,
  Code
} from '@mantine/core'

export default function () {

  const draft = useDraftStore()
  const prop  = draft.proposal

  const programs = prop.data.programs.map((item, idx) => (
    <Group key={idx} mb={15}>
      <Code>{JSON.stringify(item)}</Code>
      <ActionIcon color="red" onClick={() => prop.program.rem(idx) }>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ))

  const form = useForm({
    initialValues : {
      method    : 'endorse',
      actions   : '*',
      paths     : '*',
      threshold : 1,
      pubkeys   : []
    }
  })

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A program is used to execute an action within the contract. Each program specifies a set of actions that can be taken, and which spending paths can be selected.
        <br /><br />
        You can express multiple options using a pipe '|' as a separator, or an asterisk '*' to allow all.
        <br /><br />
        The default method is 'endorse', which uses a digital signature for verification. A threshold can be set (for multi-sig), plus a list of pubkeys that are allowed to sign.
      </Text>

      {programs.length !== 0 && programs || <Text mb={30} ml={30} c='dimmed' size='sm'>no programs have been defined</Text>}

      <Fieldset legend={<span style={{ fontWeight: 'bold' }}>Program</span>}>
        <Stack>
          <Group>
            <TextInput
              label="Method"
              style={{ flex: 1 }}
              {...form.getInputProps('method')}
            />
            <TextInput
              label="Actions"
              style={{ flex: 1 }}
              {...form.getInputProps('actions')}
            />
            <TextInput
              label="Paths"
              style={{ flex: 1 }}
              {...form.getInputProps('paths')}
            />
          </Group>
          <Group>              
            <NumberInput
              label="Threshold"
              style={{ flex: 1 }}
              {...form.getInputProps('threshold')}
            />
            <TagsInput
              label="Pubkeys"
              style={{ flex: 1 }}
              {...form.getInputProps('pubkeys')}
            />
          </Group>
        </Stack>
      </Fieldset>
      <Button
        variant='subtle'
        leftSection={<IconPlus size={'14px'}/>}
        style={{borderRadius: '15px', color: '#0068FD' }}
        onClick={() => {
          const { method, actions, paths, threshold, pubkeys } = form.values
          prop.program.add([ method, actions, paths, threshold, ...pubkeys ])
        }}
      >
        Add New Program
      </Button>
    </Box>
  )
}
