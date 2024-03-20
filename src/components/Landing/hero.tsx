import {
  Grid,
  Title,
  Text,
  Box,  
  Button,
  Image,
  Group
} from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';

import {
  IconChevronRight,
  IconSchool,
} from '@tabler/icons-react';

export default function Hero() {

  const isMobile = useMediaQuery('(max-width: 982px)');

  return (
    <Grid>
    {isMobile ? (
      <>
        {/* Right Column for Image on Top in Mobile */}
        <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
                src="/Images/slide.png"
                alt="Slide"
                style={{ width: '100%', maxWidth: '60%', height: 'auto', aspectRatio: '1 / 1' }}
            />
        </Grid.Col>
        {/* Left Column for Text on Bottom in Mobile */}
        <Grid.Col span={12}>
          <Title order={1} p={20} pb={10}>Welcome to the API Playground</Title>
          <Text size="sm" p={20} pt={0}>Get hands-on experience with our API's features through examples and guided tutorials, making your integration smooth and straightforward.</Text>
          <Button
            rightSection={<IconChevronRight size={14}/>}
            mt={30}
            ml={20}
            mb={isMobile? 40 : 0}
            w={150}
            style={{
                borderRadius: '15px',
                backgroundColor: '#0068FD'
            }}
            onClick={() => window.location.href = '/drafts/new'}
            >
Get Started
            </Button>
            <Button
              rightSection={<IconSchool size={20}/>}
              variant='transparent'
              mt={20}
              w={160}
              ml={10}
              mb={30}
              style={{
                  borderRadius: '15px',
                  color: '#0068FD'
              }}
              onClick={() => window.open('SCHOOLLINK', '_blank')}
          >
Watch Tutorial
          </Button>
        </Grid.Col>
        
      </>
    ) : (
      <>
        {/* Left Column for Text on Desktop */}
        <Grid.Col span={6}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '90px 20px',
          }}
        >
          <Title order={1} pb={20}>Welcome to the API Playground</Title>
          <Text size="sm">
            Get hands-on experience with our API's features through examples and guided tutorials, making your integration smooth and straightforward.
                </Text>
          <Group mt={30} mb={30}>
            <Button
              w={150}
              rightSection={<IconChevronRight size={14}/>}
              style={{
                borderRadius: '15px',
                backgroundColor: '#0068FD'
              }}
              onClick={() => window.location.href = '/drafts/new'}
              >
  Get Started
            </Button>
            <Button
              rightSection={<IconSchool size={20}/>}
              variant='transparent'
              w={160}
              ml={10}
              style={{
                  borderRadius: '15px',
                  color: '#0068FD'
              }}
              onClick={() => window.open('https://bitescrow.dev', '_blank')}
            >
  Watch Tutorial
            </Button>
          </Group>
        </Box>
        </Grid.Col>
        {/* Right Column for Image on Desktop */}
        <Grid.Col span={6}>
          <Image
            src="/Images/slide.png"
            alt="Slide"
            style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', padding: '10px' }}
          />
        </Grid.Col>
      </>
    )}
  </Grid>
  );
}
