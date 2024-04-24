import { Code, Group, Text } from '@mantine/core'

interface Props {
  label : string
  value : string
}

export default function ({ label, value } : Props) {
  return (
    <Group>
      <Text w={50} size='xs'>{label}</Text>
      <Text>:</Text>
      <Code>{value}</Code>
    </Group>
  )
}
