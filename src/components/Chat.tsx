import { AppBar, Box, Button, Container, Input, Typography } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Messages from './Messages';

import styles from '../styles/Messages.module.scss';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ name: '', room: '' });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }: { data: { meassage: string; user: { name: string } } }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('room', ({ data: { users } }: { data: { users: { name: string }[] } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit('leftRoom', { params });
    navigate('/');
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    socket.emit('sendMessage', { message, params });
    setMessage('');
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
        height="100%"
        width="500px"
        sx={{
          backgroundColor: '#343B29',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <AppBar
          sx={{
            backgroundColor: '#414833',
            paddingX: '20px',
            paddingY: '5px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          position="static">
          <Typography>{params.room}</Typography>
          <Typography variant="button" sx={{ fontSize: '.7rem', textTransform: 'lowercase' }}>
            {users} users in the room
          </Typography>
          <Button
            onClick={leftRoom}
            variant="contained"
            color="error"
            sx={{
              height: '20px',
              fontSize: '.6rem',
              minWidth: '40px',
              width: '20px',
              paddingTop: '8px',
            }}>
            Exit
          </Button>
        </AppBar>
        <Box sx={{ overflow: 'auto', paddingX: '20px', height: '100%' }} className={styles.scroll}>
          <Messages messages={state} name={params.name} />
        </Box>
        <AppBar
          sx={{
            backgroundColor: '#414833',
            paddingX: '20px',
            paddingY: '5px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          position="static">
          <form
            onSubmit={handlerSubmit}
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message"
              color="success"
              sx={{ width: '100%', marginRight: '20px', color: '#fff' }}
            />
            <Button onClick={() => setOpen(!isOpen)} color="success" sx={{ minWidth: '10px' }}>
              <SentimentSatisfiedAltIcon />
            </Button>
            <Box width="40px" height="30px">
              {isOpen && (
                <EmojiPicker
                  onEmojiClick={({ emoji }) => setMessage(`${message} ${emoji}`)}
                  style={{
                    maxWidth: '410px',
                    width: '100%',
                    height: '410px',
                    position: 'absolute',
                    bottom: '47px',
                    right: '0',
                  }}
                />
              )}
            </Box>
            <Button type="submit" onSubmit={handlerSubmit} variant="contained" color="success">
              Send
            </Button>
          </form>
        </AppBar>
      </Box>
    </Container>
  );
};

export default Chat;
