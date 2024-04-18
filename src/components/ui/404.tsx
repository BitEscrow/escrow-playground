import React            from 'react';
import { useNavigate }  from 'react-router-dom';
import {
  Container,
  Paper,
  Text,
  Button,
} from '@mantine/core'; // Corrected import

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Container size="xl" mt={50} style={{
      minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ width: '400px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text size="lg" fw={700} ta="center" style={{ marginBottom: '1rem', fontSize: '120px' }}>
          404
        </Text>
        <Text size="xl" fw={700} ta="center" style={{ marginBottom: '1rem' }}>
          Oops! Page Not Found
        </Text>
        <Text ta="center" style={{ marginBottom: '2rem' }}>
          The page you are looking for does not exist.
        </Text>
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          style={{ borderRadius: '25px', maxWidth: '200px' }} // Corrected properties
        >
          Go to Homepage
        </Button>
      </Paper>
    </Container>
  );
}

export default NotFoundPage;
