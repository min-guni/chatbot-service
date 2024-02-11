import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import ChatBot from './components/chatbot/chatbot';
import LogIn from './pages/session/signin';
import { ThemeProvider } from '@mui/material';
import { Theme } from './theme/theme';
import SignIn from './pages/session/signin';
import SignUp from './pages/session/signup';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
