import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { postChatBot } from '../../service/chatbot/chatBotService';

const ChatBot = () => {
  const [chatList, setChatList] = useState([{ message: 'tlqkf', id: 0 }]); // id : 0 -> me 1 -> Bot
  const [loading, setLoading] = useState(false);

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
          console.log(res.data.message);
          setChatList((chatList) => {
            const updatedList = [...chatList];
            updatedList[chatList.length - 1] = { message: res.data.message, id: 1 };
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
    <div style={{ maxWidth: 400, margin: 'auto', maxHeight: 600 }}>
      <Paper elevation={3} style={{ height: 400, overflowY: 'auto' }}>
        <List>
          {chatList.map((message, index) => (
            <ListItem
              key={index}
              style={{ justifyContent: message.id === 0 ? 'flex-end' : 'flex-start' }}
            >
              <ListItemText
                style={{
                  borderRadius: 15,
                  backgroundColor: message.sender === 0 ? '#4CAF50' : '#2196F3',
                  color: 'white',
                  padding: '8px',
                }}
              >
                <Typography>{message.message}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <TextField
          label="메시지 입력"
          variant="outlined"
          fullWidth
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim() !== '') {
              sendQuery(e.target.value);
              e.target.value = '';
            }
          }}
          style={{
            position: 'sticky',
            bottom: 0,
          }}
        />
      </Paper>
    </div>
  );
};

export default ChatBot;
