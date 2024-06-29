import { Route, Routes } from 'react-router';
import Main from './Main';
import Chat from './Chat';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
);

export default AppRoutes;
