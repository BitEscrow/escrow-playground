import {
    Grid,
    Title,
    Text,
    Box,
    Image,
    Button
} from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';

import {
  IconChevronRight,
} from '@tabler/icons-react';

export default function Docs() {

  const isMobile = useMediaQuery('(max-width: 982px)');

  return (
    <Grid>
    {isMobile ? (
      <>
        {/* Right Column for Image on Top in Mobile */}
        <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
                src="/Images/book.png"
                alt="Book"
                style={{ width: '100%', maxWidth: '60%', height: 'auto', aspectRatio: '1 / 1' }}
            />
        </Grid.Col>
        {/* Left Column for Text on Bottom in Mobile */}
        <Grid.Col span={12}>
          <Title order={1} p={20} pb={10}>Full Documentation with Examples</Title>
          <Text size="sm" p={20} pt={0}>Dive into our comprehensive documentation, packed with examples that walk you through every step of integrating and utilizing our API.</Text>
            <Button
              rightSection={<IconChevronRight size={20}/>}
              variant='transparent'
              mt={30}
              w={150}
              ml={10}
              mb={30}
              style={{
                  borderRadius: '15px',
                  color: '#0068FD'
              }}
              onClick={() => window.open('https://bitescrow.dev', '_blank')}
          >
Read The Docs
          </Button>
        </Grid.Col>
      </>
    ) : (
      <>
        {/* Left Column for Text on Desktop */}
        <Grid.Col span={6}>
          <Image
            src="/Images/book.png"
            alt="Book"
            style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', padding: '50px' }}
          />
        </Grid.Col>
        {/* Right Column for Image on Desktop */}
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
          <Title order={1} pb={20}>Full Documentation with Examples</Title>
          <Text size="sm">Dive into our comprehensive documentation, packed with examples that walk you through every step of integrating and utilizing our API.</Text>
          <Button
            rightSection={<IconChevronRight size={20}/>}
            variant='transparent'
            mt={30}
            w={180}
            ml={-20}
            style={{
                borderRadius: '15px',
                color: '#0068FD'
            }}
            onClick={() => window.open('https://bitescrow.dev', '_blank')}
          >
Read The Docs
          </Button>
        </Box>
        </Grid.Col>
      </>
    )}
  </Grid>
  );
}
