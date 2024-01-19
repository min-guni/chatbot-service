import React, { useEffect, useState } from 'react';
import { Box, Button, Input, TextField } from '@mui/material';
import { postChatBot } from '../../service/chatbot/chatBotService';

const ChatBot = () => {
  const [chatList, setChatList] = useState([{ message: 'tlqkf', id: 0 }]);
  const [loading, setLoading] = useState(false);

  const sendQuery = (event) => {
    let message = event.target.value;
    if (event.keyCode === 13 && !loading && message.trim() !== '') {
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
          event.target.value = '';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {chatList.map((message, index) => (
        <Box key={index} variant={message.id === 0 ? 'green' : 'blue'}>
          {message.message}
        </Box>
      ))}
      <div>{loading === true ? 'true' : 'false'} 안녕</div>
      <Input label="내용을 입력하세요" onKeyDown={sendQuery} disabled={loading}></Input>
    </div>
  );
};

export default ChatBot;
