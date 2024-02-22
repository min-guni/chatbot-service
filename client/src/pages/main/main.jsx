import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatBot from '../../components/chatbot/chatbot';
import TimeTable from '../../components/timetable/editTable';

import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// UI 컴포넌트 및 애니메이션 효과 임포트
import HeaderComponent from '../../components/ui/HeaderComponent';
import { animationMixin } from '../../components/effect/Animation';

// 글로벌 스타일 정의
const AllGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-ExtraBold';
    src: url('/font/Pretendard-ExtraBold.ttf') format('truetype');
  }
  body {
    font-family: 'Pretendard-ExtraBold';
  }
  @font-face {
    font-family: 'Pretendard-SemiBold';
    src: url('/font/Pretendard-SemiBold.ttf') format('truetype');
  }
`;

// 메인 레이아웃 스타일링
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  ${animationMixin};
`;

const SecondWrapper = styled.div`
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 50px; // 중복 padding-top 수정
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  gap: 80px;
`;

// 메인 타이틀 스타일링
const MainTitleText = styled.p`
  font-size: 46px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 30px;
  font-family: 'Pretendard-ExtraBold';
  co  r: #252a2f;
`;

// 하이라이트 텍스트 스타일링
const HighlightText = styled.span`
  color: #252a2f;
  background: linear-gradient(to right, #f2f7d3, #f9dcdc);
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;

// 클릭 가능한 박스 스타일링
const Box = styled.div`
  font-size: 30px;
  border-radius: 15px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  max-width: 400px;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-ExtraBold';
  box-sizing: border-box;
  ${animationMixin}
`;

// 박스 내 텍스트 스타일링
const BoxText = styled.p`
  font-size: clamp(16px, 2vw, 20px);
  margin: 0;
  color: #252a2f;
  word-wrap: break-word;
  @media (max-width: 768px) {
    font-size: clamp(14px, 4vw, 18px);
  }
`;

// 마우스 오버 시 스타일 변화를 주는 클릭 가능한 박스
const ClickableBox = styled(Box)`
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f8f8ef;
  }
`;


const Main = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('ChatBot');
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 활성화
    setAnimate(true);
  }, []);

  // 페이지 이동 함수
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <AllGlobalStyle />
      <HeaderComponent />
      <Wrapper>
        <MainTitleText>
          <div>안녕하세요,</div>
          <div style={{paddingTop: '15px'}}><HighlightText>애브리타임 챗봇 서비스</HighlightText></div>
          <div style={{paddingTop: '15px'}}>입니다.</div>
        </MainTitleText>
        <SecondWrapper>
          <ClickableBox style={{backgroundColor: '#fdf3f1'}} onClick={() => navigateTo('/chatbot')}>
            <BoxText>
              <div>챗봇 서비스</div>
              <div style={{fontSize: '23px', textAlign: 'right', marginTop: '20px'}}>학교 생활에 도움이 필요하신가요?</div>
              <div style={{fontSize: '23px', textAlign: 'right'}}>우리의 챗봇이 도움을 줄 거에요.</div>
              <div style={{fontSize: '18px', color: '#8f96a0', textAlign: 'right', marginTop: '20px'}}>무려, 3분 안에 ✍🏻</div>
            </BoxText>
          </ClickableBox>
          
          <ClickableBox style={{backgroundColor: '#eff7fd'}} onClick={() => navigateTo('/timetable')}>
            <BoxText>
              <div>시간표 ⏰</div>
              <div style={{fontSize: '23px', textAlign: 'right', marginTop: '20px'}}>시간표를 빠르고 간편하게!</div>
              <div style={{fontSize: '23px', textAlign: 'right'}}>이번 학기의 시간표는 맡기세요.</div>
              <div style={{fontSize: '18px', color: '#8f96a0', textAlign: 'right', marginTop: '20px'}}>훨씬 빠르고 간편한 검색 서비스.</div>
            </BoxText>
          </ClickableBox>
        </SecondWrapper>
      </Wrapper>
    </div>
  );
};

export default Main;
