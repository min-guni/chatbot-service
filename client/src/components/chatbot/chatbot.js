import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { getChat, postChatBot } from '../../service/chatbot/chatBotService';
import { lightBlue, blueGrey } from '@mui/material/colors';
import { AccountCircle } from '@mui/icons-material';
import TelegramIcon from '@mui/icons-material/Telegram';

const ChatBot = () => {
  const [username, setUsername] = useState('User');
  const [chatList, setChatList] = useState([]); // id : 0 -> me 1 -> Bot
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    getChat()
      .then((res) => {
        setChatList(res.data);
        setUsername(localStorage.getItem('username'));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendQuery = (message) => {
    if (!loading && message.trim() !== '') {
      setLoading(true);

      setChatList((chatList) => [
        ...chatList,
        { message: message, id: 0 },
        { message: 'loading', id: 1 },
      ]);
      postChatBot(message)
        .then((res) => {
          setChatList((chatList) => {
            const updatedList = [...chatList];
            updatedList[chatList.length - 1] = { message: res.data, id: 1 };
            return updatedList;
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ margin: 'auto' }}>
      <Paper
        elevation={0}
        style={{
          overflowY: 'auto',
          height: `calc(100vh - 117px)`,
          paddingLeft: 200,
          paddingRight: 200,
        }}
      >
        <List>
          {chatList.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: message.id === 0 ? blueGrey[500] : lightBlue[600] }}>
                    {message.id === 0 ? <AccountCircleIcon /> : <SmartToyIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      fontWeight="bold"
                      variant="body1"
                      color="text.primary"
                    >
                      {message.id === 0 ? username : 'Bot'}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                      >
                        {message.message === 'loading' ? (
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress />
                          </Box>
                        ) : (
                          message.message
                        )}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <TextField
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValue.trim() !== '') {
              if (loading) {
                setSnackBarOpen(true);
                return;
              }
              sendQuery(inputValue);
              e.target.value = '';
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ position: 'fixed', bottom: 61, left: 200, right: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle fontSize="large" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    if (inputValue.trim() !== '') {
                      if (loading) {
                        setSnackBarOpen(true);
                        return;
                      }
                      sendQuery(inputValue);
                      setInputValue('');
                    }
                  }}
                  sx={{ color: blueGrey[500] }}
                >
                  <TelegramIcon fontSize="large" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      <Snackbar
        open={snackBarOpen}
        onClose={() => {
          setSnackBarOpen(false);
        }}
        message="Waiting for Chatbot Answer..."
        autoHideDuration={5000}
      />
    </div>
  );
};

export default ChatBot;
