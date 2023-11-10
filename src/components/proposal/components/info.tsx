import { ProposalData } from '@scrow/core'
import { shorten_str }  from '@/lib/util'
import { convert_date } from '@/lib/date'
import { now }          from '@scrow/core/util'

import { Box, Stack, Table, Text, Title } from '@mantine/core'

import styles from '../styles.module.css'

interface Props {
  data : ProposalData
}

export default function ProposalInfoView ({ data } : Props) {

  const {
    deadline, details, effective, expires, network, 
    moderator, title, value, version
  } = data

  const date_deadline = (deadline !== undefined)
    ? convert_date(now() + deadline)
    : 'no deadline set'

  const date_effective = (effective !== undefined)
    ? convert_date(effective)
    : 'no effective date'

  const date_expires = convert_date(now() + expires)

  const mod_key = (moderator !== undefined)
    ? shorten_str(moderator)
    : 'no moderator'

  return (
    <Box>
      <Stack>
        <Title order={4}>{title}</Title>
        <Text>{details}</Text>
      </Stack>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className={styles.label}>Deadline</Table.Td>
            <Table.Td className={styles.value}>{date_deadline}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={styles.label}>Effective</Table.Td>
            <Table.Td className={styles.value}>{date_effective}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={styles.label}>Expires</Table.Td>
            <Table.Td className={styles.value}>{date_expires}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={styles.label}>Network</Table.Td>
            <Table.Td className={styles.value}>{network}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={styles.label}>Moderator</Table.Td>
            <Table.Td className={styles.value}>{mod_key}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={styles.label}>Value</Table.Td>
            <Table.Td className={styles.value}>{value}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={styles.label}>Version</Table.Td>
            <Table.Td className={styles.value}>{version}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Box>
  )
}
