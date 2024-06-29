import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FIELDS = {
  NAME: 'name',
  ROOM: 'room',
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' });

  const handlerChange = ({
    target: { value, name },
  }: {
    target: { value: string; name: string };
  }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e: React.FormEvent) => {
    const isDisabled = Object.values(values).some((value) => !value);

    if (isDisabled) e?.preventDefault();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingY: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        flexDirection="column"
        maxWidth="400px">
        <Typography variant="h4" color=" #999950" mb={2}>
          Join us!
        </Typography>
        <TextField
          id="name"
          name="name"
          value={values[NAME]}
          label="Name"
          variant="outlined"
          color="success"
          sx={{ backgroundColor: '#999950', borderRadius: '5px' }}
          onChange={handlerChange}
        />
        <TextField
          id="room"
          name="room"
          value={values[ROOM]}
          label="Room"
          variant="outlined"
          color="success"
          sx={{ backgroundColor: '#999950', borderRadius: '5px' }}
          onChange={handlerChange}
        />
        <Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`} onClick={handleClick}>
          <Button variant="contained" color="success">
            Sign In
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Main;
