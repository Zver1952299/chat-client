import { Container, CssBaseline } from '@mui/material';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(150deg, #000000 0%, #004524 200%)',
          height: '100vh',
        }}>
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;
