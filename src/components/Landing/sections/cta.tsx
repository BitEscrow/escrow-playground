import {
    Button,
    Stack,
    Group,
    Title,
    Text,
    Center
} from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';

export default function CTA() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Stack align="center" p="md" mt={40}>
      <Title order={1}>Get Started</Title>
      <Text size="sm">This is some centered subtext below the title.</Text>

      <Center style={{ width: '100%' }}>
        <Group dir={isMobile ? 'column' : 'row'} justify="center" p="xs">
          <Button variant="transparent" c='#0068FD'>Tutorial Video</Button>
          <Button variant="outline" c='white' bg='#0068FD' style={{borderRadius: '15px'}}>Get Started</Button>
        </Group>
      </Center>
    </Stack>
  );
}
