import {
    Grid,
    Title,
    Text,
    Box,
    Image
} from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';

export default function Hero() {

  const isMobile = useMediaQuery('(max-width: 880px)');

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
          <Text size="sm">Get hands-on experience with our API's features through examples and guided tutorials, making your integration smooth and straightforward.</Text>
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
