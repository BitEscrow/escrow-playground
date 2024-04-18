import { UseFormReturnType }    from '@mantine/form'
import { IconPlus, IconTrash }  from '@tabler/icons-react'
import { ProposalData }         from '@scrow/sdk/core'

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
  Stack
} from '@mantine/core'


import { useMediaQuery } from '@mantine/hooks'

interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ({ enabled, form } : Props) {

  const is_disabled = !enabled.includes('paths')

  const isMobile = useMediaQuery('(max-width: 768px)');

  const formatTag = (tag: string) => {
    if (isMobile && tag.length > 12) {
      return `${tag.slice(0, 6)}...${tag.slice(-6)}`;
    }
    return tag;
  };

  const fields = form.values.programs.map((item, index) => {
    const [ actions, paths, method, ...args ] = item

    const formattedArgs = args.map(arg => isMobile ? formatTag(String(arg)) : String(arg));

    return (
      <Fieldset legend={<span style={{ fontWeight: 'bold' }}>Program</span>} key={index} mt={15} mb={15}>
        <Stack>
          <Group>
            <TextInput
              withAsterisk
              label="Method"
              disabled={is_disabled}
              style={{ flex: 1 }}
              {...form.getInputProps(`programs.${index}.0`)}
              defaultValue="endorse"
            />
            <TextInput
              withAsterisk
              label="Actions"
              disabled={is_disabled}
              style={{ flex: 1 }}
              {...form.getInputProps(`programs.${index}.1`)}
            />
            <TextInput
              withAsterisk
              label="Paths"
              disabled={is_disabled}
              style={{ flex: 1 }}
              {...form.getInputProps(`programs.${index}.2`)}
            />
            { !is_disabled && 
              <ActionIcon color="red" onClick={() => form.removeListItem('programs', index)}>
                <IconTrash size="1rem" />
              </ActionIcon>
            }
          </Group>
          <Group>              
            <NumberInput
              withAsterisk
              label="Threshold"
              disabled={is_disabled}
              style={{ flex: 1 }}
              value={Number(args[0])}
              defaultValue={1}
              min={1}
              onChange={(e) => {
                const prog = [ actions, paths, method, Number(e), ...args.slice(1) ]
                return form.setFieldValue(`programs.${index}`, prog)
              }}
            />
            <TagsInput
              withAsterisk
              label="Pubkeys"
              disabled={is_disabled}
              style={{ flex: 1 }}
              value={formattedArgs.slice(1)}
              onChange={(e) => {
                const prog = [ actions, paths, method, args[0], ...e ]
                return form.setFieldValue(`programs.${index}`, prog)
              }}
            />
          </Group>
        </Stack>
      </Fieldset>
    )
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

      {fields.length === 0 &&
        <Text c="dimmed" ta="center" mt={40}>
          No programs have been created.
        </Text>
      }

      {fields}

      <Group mt="sm" justify='right'>
        <Button
          variant='subtle'
          leftSection={<IconPlus size={'14px'}/>}
          style={{borderRadius: '15px', color: !is_disabled? '#0068FD' : 'gray'}}
          disabled={is_disabled}
          onClick={() =>
            form.insertListItem('programs', [ 'endorse', '*', '*', '1' ])
          }
        >
          Add New Program
        </Button>
      </Group>
    </Box>
  )
}
