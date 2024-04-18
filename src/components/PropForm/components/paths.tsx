import { UseFormReturnType } from '@mantine/form'
import { IconTrash }         from '@tabler/icons-react'
import { ProposalData }      from '@scrow/sdk/core'

import {
  NumberInput,
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button
} from '@mantine/core'

import { IconPlus } from '@tabler/icons-react';

interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ({ enabled, form } : Props) {

  const is_disabled = !enabled.includes('paths')

  const fields = form.values.paths.map((input, index) => {
    const label   = `paths.${index}.0`
    const amount  = `paths.${index}.1`
    const address = `paths.${index}.2`

    const formatAddress = (address: string) => {
      if (address.length > 27) {
        return `${address.slice(0, 19)}...${address.slice(-19)}`;
      }
      return address;
    };


    return (
      <Group key={index} mb={15}>
        <TextInput maw={'28%'}
          label="Label"
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(label)}
        />
        <NumberInput maw={'72%'}
          label="Amount"
          disabled={is_disabled}
          style={{ flex: 1 }}
          value={input[1]}
          onChange={e => form.setFieldValue(amount, Number(e))}
          defaultValue={1000}
          min={1000}
        />
        <TextInput maw={370}
          label="Address"
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(address)}
          value={formatAddress(form.values.paths[index][2] || '') }
        />
        { !is_disabled && 
          <ActionIcon color="red" onClick={() => form.removeListItem('paths', index)}>
            <IconTrash size="1rem" />
          </ActionIcon>
        }
      </Group>
    )
  })

  return (
    <Box>
      <Text mt={5} mb={30} c='dimmed' size='sm'>
        A spending path is a conditional payment. Each path is labeled, and these labels are used to choose a settlement path for the contract.
        <br/><br/>
        Paths are grouped by label, and each group is converted into a transaction template. These templates are used to lock funds to the contract.
      </Text>
      { fields.length === 0 &&
        <Text c="dimmed" mt={40} ta="center">
          No spending paths have been created.
        </Text>  
      }

      {fields}

      <Group justify="right" mt="sm">
        <Button
          disabled={is_disabled}
          variant='subtle'
          leftSection={<IconPlus size={'14px'}/>}
          style={{borderRadius: '15px', color: !is_disabled? '#0068FD' : 'gray'}}
          onClick={() =>
            form.insertListItem('paths', [ 'payout', 1000, undefined ])
          }
        >
          Add Spending Path
        </Button>
      </Group>
    </Box>
  )
}
