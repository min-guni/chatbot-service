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
import { postChatBot } from '../../service/chatbot/chatBotService';
import { lightBlue, blueGrey } from '@mui/material/colors';
import { AccountCircle } from '@mui/icons-material';
import TelegramIcon from '@mui/icons-material/Telegram';

const ChatBot = () => {
  const [chatList, setChatList] = useState([
    { message: '컴퓨터과학과 게시판에서 AWS에 대한 내용의 게시물을 검색해줘', id: 0 },
    {
      message:
        '컴퓨터는 현대 사회에서 핵심적인 역할을 하는 전자기기로, 정보를 처리하고 저장하는 데 사용됩니다. 컴퓨터는 다양한 종류의 작업을 수행할 수 있는 다목적 기계이며, 많은 산업과 개인 생활에서 필수적인 기술 도구로 자리잡고 있습니다.\n' +
        '\n' +
        '컴퓨터는 기본적으로 하드웨어와 소프트웨어로 이루어져 있습니다. 하드웨어는 실제적인 물리적 부품들로, 중앙 처리 장치(CPU), 메모리(RAM), 저장 장치(하드 디스크 또는 SSD), 입력 장치(키보드, 마우스 등), 출력 장치(모니터, 프린터 등) 등이 포함됩니다. 이러한 하드웨어들은 서로 협력하여 사용자의 명령을 받아들이고 실행하는 역할을 합니다.\n' +
        '\n' +
        '소프트웨어는 컴퓨터가 수행하는 작업과 기능을 결정하는 프로그램과 데이터의 집합을 의미합니다. 운영 체제(Windows, macOS, Linux 등)는 컴퓨터의 기본 동작을 관리하고 응용 프로그램이 하드웨어 리소스를 효율적으로 사용할 수 있도록 지원합니다. 응용 프로그램은 사용자의 요구에 따라 다양한 작업을 수행하는데, 웹 브라우저, 문서 편집기, 게임 등이 이에 해당합니다.\n' +
        '\n' +
        '컴퓨터의 역사적으로 중요한 발전 중 하나는 인터넷의 등장입니다. 인터넷은 전 세계의 컴퓨터들을 연결하여 정보를 교환하고 공유하는데 사용되며, 웹 검색, 전자우편, 소셜 미디어 등 다양한 서비스를 가능케 합니다.\n' +
        '\n' +
        '또한, 현대 컴퓨팅에서는 클라우드 컴퓨팅이 중요한 역할을 하고 있습니다. 클라우드 컴퓨팅은 인터넷을 통해 컴퓨터 자원을 제공하고 이용하는 기술로, 데이터 저장, 계산, 네트워크 등을 클라우드 서비스 제공자가 제공하는 서버에서 처리하는 형태입니다.\n' +
        '\n' +
        '컴퓨터는 연속적으로 발전하고 있으며, 인공 지능, 빅데이터, 사물 인터넷 등의 기술과의 결합으로 미래에는 더욱 강력하고 다양한 기능을 제공할 것으로 기대됩니다.',
      id: 1,
    },
  ]); // id : 0 -> me 1 -> Bot
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

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
                      {message.id === 0 ? 'User' : 'Bot'}
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
