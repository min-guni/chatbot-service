import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import ChatBot from './components/chatbot/chatbot';
import LogIn from './pages/session/signin';
import { ThemeProvider } from '@mui/material';
import { Theme } from './theme/theme';
import SignIn from './pages/session/signin';
import SignUp from './pages/session/signup';
import Auth from './service/auth';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route exact path="/" element={Auth(Main, true)}></Route>
          <Route exact path="/signin" element={Auth(SignIn, false)}></Route>
          <Route exact path="/signup" element={Auth(SignUp, false)}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
