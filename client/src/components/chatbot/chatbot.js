import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
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

import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
// 공통 UI 컴포넌트 및 애니메이션 효과 임포트
import HeaderComponent from '../ui/HeaderComponent';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { animationMixin } from '../effect/Animation';

// 글로벌 스타일 설정
const AllGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-ExtraBold';
    src: url('/font/Pretendard-ExtraBold.ttf') format('truetype');
  }
  body {
    font-family: 'Pretendard-ExtraBold';
  }
  @font-face {
    font-family: 'Pretendard-Medium';
    src: url('/font/Pretendard-Medium.ttf') format('truetype');
  }
`;

const HighlightText = styled.span`
    color: #252a2f;
    background: linear-gradient(to right, #f2f7d3, #f9dcdc);
    border-radius: 15px;
    padding-left: 10px;
    padding-right: 10px;
`;

// 텍스트 및 버튼 스타일
const MainTitleText = styled.p`
    font-size: 46px;
    font-weight: bold;
    text-align: center;
    padding-top: 10px;
    font-family: 'Pretendard-ExtraBold';
    color: #252a2f;
    ${animationMixin};
`;

// 페이지 상단의 헤더 박스 스타일
const HeaderBox = styled.div`
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40px; /* 높이 조정 */
    width: 100px;
    margin-left: 5px;
    margin-right: 5px;
    
`;

// 클릭 가능한 헤더 박스 스타일
const ClickableBox = styled(HeaderBox)`
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #dcdcdc;
  }
`;

// 헤더 박스 내 텍스트 스타일
const HeaderBoxTextNone = styled.p`
  font-size: 16px;
  text-align: center;
  color: #8c8c8c;
  font-family: 'Pretendard-ExtraBold';

`;

// 메인 레이아웃 스타일링
const Wrapper = styled.div`
  padding-left: 150px; // padding 일관성 있게 조정
  display: flex;
  align-items: center;
  width: 80%;
  ${animationMixin};
`;
const Wrapper_1 = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center; 
  padding: 0 20px; 
  max-width: 100%; 
  ${animationMixin};
`;
// 입력 필드와 버튼을 포함하는 래퍼
const SecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px
  justify-content: space-between;
  height: 30%;
`;

// 채팅 메시지 입력과 전송 버튼 컨테이너
const ThirdWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 600px;
  height: 100%;
`;

// 커스텀 텍스트 입력 필드 스타일
const CustomTextInput = styled(TextInput)`
  flex: 1;
  box-sizing: border-box;
`;


// 커스텀 버튼 스타일
const CustomButton = styled(Button)`
  padding: 7px 7px;
  font-size: 30px;
  border-radius: 15px;
  cursor: pointer;
  background: linear-gradient(to right, #f2f7d3, #f9dcdc);
  color: white;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-ExtraBold';
  height: 100px;
`;

const ListWrapper = styled.div`
  max-height: 60vh; /* 예시 높이, 필요에 따라 조절 */
  overflow-y: auto;
  padding: 0 20px; 
  max-width: 500px; 
  width: 100%; 
`;
 
const Bot_Icon = () => {
  return (
    <img src = "../assets/chatbot_logo.png" style={{width: "40px", height: "40px", borderRadius: "50%"}}></img>
  )
}
const User_Icon = () => {
  return (
    <img src = "../assets/user_logo.png" style={{width: "40px", height: "40px", borderRadius: "50%"}}></img>
  )
}
const ChatbotVideo = () => {
  return (
      <video autoPlay loop style={{width :'600px', height : "auto" , borderRadius : '10px', marginBottom: '30px'}}>
          <source src="../assets/dynamic_chatbot.mp4" type="video/mp4" />
      </video>
  )
};

const ChatBot = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');
  const [chatList, setChatList] = useState([]); // id : 0 -> me 1 -> Bot
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

   // 페이지 이동 함수
  const navigateTo = (path) => {
    console.log(`${path} clicked!`);
    navigate(path);
  };

  

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
    <div>
      <AllGlobalStyle />
      <HeaderComponent>
        {/* HeaderComponent의 RightContainer에 들어갈 내용을 children으로 전달 */}
        <ClickableBox onClick={() => navigateTo('/chatbot')}>
          <HeaderBoxTextNone>챗봇</HeaderBoxTextNone>
        </ClickableBox>
        <ClickableBox onClick={() => navigateTo('/timetable')}>
          <HeaderBoxTextNone>시간표</HeaderBoxTextNone>
        </ClickableBox>
      </HeaderComponent>
      <MainTitleText>
          <div style={{paddingTop: '15px'}}>🤖 <HighlightText>챗봇</HighlightText>이 도와드릴게요</div>
      </MainTitleText>
      <Wrapper_1  >
      <SecondWrapper>
        <ChatbotVideo />
        <ThirdWrapper>
          <CustomTextInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim() !== '') {
                if (loading) {
                  setSnackBarOpen(true);
                  return;
                }
                sendQuery(inputValue);
                setInputValue('');
              }
            }}
          />
          <CustomButton title='🔍'
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
          />
        </ThirdWrapper>
      </SecondWrapper>
      <ListWrapper >
        <List >
          {chatList.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: message.id === 0 ? blueGrey[500] : lightBlue[600] }}>
                    {message.id === 0 ? <User_Icon /> : <Bot_Icon/>}
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
                          <Box display="flex" alignItems="center" justifyContent="center" >
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
      </ListWrapper>
      </Wrapper_1>
      
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
