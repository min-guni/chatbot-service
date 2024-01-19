import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import ChatBot from './components/chatbot/chatbot';
import LogIn from './pages/session/login/login';
import { ThemeProvider } from '@mui/material';
import { Theme } from './theme/theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/chat" element={<ChatBot />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
