// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box } from '@mui/material';
import styles from '../styles/Messages.module.scss';

const Messages = ({ messages, name }) => {
  return (
    <Box>
      {messages.map(({ message, user }, i) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? styles.me : styles.user;

        return (
          <div className={`${styles.message} ${className}`} key={i}>
            <span className={styles.user}>{user.name}</span>
            <div>
              <span className={styles.text}>{message}</span>
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export default Messages;
