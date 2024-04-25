import { Code, Group, Text } from '@mantine/core'

interface Props {
  label : string
  value : string
}

export default function ({ label, value } : Props) {
  return (
    <Group>
      <Text w={100} size='sm'>{label}</Text>
      <Text>:</Text>
      <Code>{value}</Code>
    </Group>
  )
}
