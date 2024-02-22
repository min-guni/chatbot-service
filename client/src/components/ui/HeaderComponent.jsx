import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 헤더 전체를 감싸는 스타일 컴포넌트
const Header = styled.div`
  display: flex;
  justify-content: space-between; // 좌우 정렬
  align-items: center; // 세로 중앙 정렬
  height: 80px;
  color: white;
`;

// 헤더의 왼쪽 컨테이너 스타일링
const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start; // 시작점 정렬
  align-items: center; // 세로 중앙 정렬
  padding-left: 180px; // 좌측 패딩
`;

// 헤더의 오른쪽 컨테이너 스타일링
const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 끝점 정렬
  padding-right: 180px; // 우측 패딩
`;

// 로고를 감싸는 컨테이너 스타일
const HeaderLogo = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column; // 세로 방향 정렬
  justify-content: center; // 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  height: 40px;
  width: 100px;
  cursor: pointer; // 클릭 가능 표시
`;

// 클릭 가능한 로고 스타일 (상속)
const ClickableBoxLogo = styled(HeaderLogo)`
  cursor: pointer;
`;

// 로고 이미지 스타일링
const HeaderLogoImage = styled.img`
  height: 60px;
  width: auto; // 자동 너비
  object-fit: contain; // 비율 유지
`;

// 헤더 텍스트 스타일링
const HeaderText = styled.p`
  font-size: 12px;
  color: #252a2f; // 글씨 색
  margin-left: 5px; // 왼쪽 마진
  font-family: 'Pretendard-ExtraBold'; // 폰트 스타일
`;

// HeaderComponent 정의
const HeaderComponent = ({ children }) => {
  const navigate = useNavigate();

  // 경로 이동 함수
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Header>
      <LeftContainer>
        {/* 로고 클릭 시 홈으로 이동 */}
        <ClickableBoxLogo onClick={() => navigateTo('/')}>
          <HeaderLogoImage src={process.env.PUBLIC_URL + '/assets/logo.png'} />
        </ClickableBoxLogo>
        <HeaderText>이공즈 프로젝트</HeaderText>
      </LeftContainer>
      <RightContainer>
        {children} {/* 동적으로 RightContainer 내용 렌더링 */}
      </RightContainer>
    </Header>
  );
};

export default HeaderComponent;
