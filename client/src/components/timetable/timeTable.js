import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { animationMixin } from '../effect/Animation';
import { deleteLecture } from '../../service/timeTable/timeTableService';
import ClearIcon from '@mui/icons-material/Clear';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

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

// 레이아웃 컴포넌트
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  ${animationMixin};
`;

const TimeTable = ({ lectureList = [], setLectureList }) => {
  const daysOfWeek = ['월', '화', '수', '목', '금'];
  const dayMap = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
  const colorList = [
    'rgba(250, 210, 225, 0.4)', // 연한 핑크
    'rgba(226, 236, 233, 0.4)', // 연한 민트
    'rgba(190, 225, 230, 0.4)', // 연한 스카이 블루
    'rgba(240, 239, 235, 0.4)', // 연한 크림색
    'rgba(212, 165, 165, 0.4)', // 연한 로즈 골드
    'rgba(222, 201, 233, 0.4)', // 연한 라벤더
    'rgba(255, 229, 217, 0.4)', // 연한 살구색
    'rgba(216, 226, 220, 0.4)', // 연한 시폰
    'rgba(255, 239, 213, 0.4)', // 파파야
    'rgba(255, 215, 186, 0.4)', // 연한 오렌지 샤베트
  ];

  const deleteUserLecture = (index) => {
    deleteLecture(lectureList[index].id).then(() => {
      setLectureList(lectureList.filter((_, i) => i !== index));
    });
  };

  const timeSlots = [
    '9:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
  ];

  const timeList = Array.from({ length: 5 }, () => Array(9).fill(null));

  const parseLectureTime = (lectureTime, index) => {
    const dayTimePairs = lectureTime.split('/');

    dayTimePairs.forEach((pairString) => {
      const time = pairString.split(/[^0-9]/).filter(Boolean);
      time.map((time) => {
        timeList[dayMap[pairString[0]]][parseInt(time, 10) - 1] = index + 1;
      });
    });
  };

  const renderTimeTable = () => {
    lectureList.map((lecture, index) => {
      parseLectureTime(lecture.schedule, index);
    });

    return (
      <Wrapper>
        <GlobalStyle />
        <TableContainer component={Paper} style={{ width: '80vw', display: 'flex', height: '50%' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#dadada' }}>
                <TableCell></TableCell>
                {daysOfWeek.map((day) => (
                  <TableCell key={day} align="center">
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map((timeSlot, time_index) => (
                <TableRow key={timeSlot} style={{ height: '9vh' }}>
                  <TableCell
                    style={{ backgroundColor: '#dadada', minWidth: 5 + `vw` }}
                    align="center"
                  >
                    {timeSlot}
                  </TableCell>
                  {daysOfWeek.map((day, day_index) => renderLecturesForCell(day_index, time_index))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    );
  };

  // 시간표에 수업을 렌더링하는 함수
  const renderLecturesForCell = (day_index, time_index) => {
    if (timeList[day_index][time_index] === null) {
      return (
        <TableCell
          sx={{ minWidth: 7 + `vw`, maxWidth: 7 + 'vw' }}
          key={`${day_index}-${time_index}`}
        ></TableCell>
      );
    }
    let message = '';
    let position = '';
    if (
      time_index === 0 ||
      timeList[day_index][time_index - 1] !== timeList[day_index][time_index]
    ) {
      message = lectureList[timeList[day_index][time_index] - 1].course_name;
      position = lectureList[timeList[day_index][time_index] - 1].classroom;
    }

    return (
      <TableCell
        key={`${day_index}-${time_index}`}
        align="center"
        sx={{
          minWidth: 7 + `vw`,
          maxWidth: 7 + 'vw',
          position: 'relative',
          background: colorList[timeList[day_index][time_index] % colorList.length],
        }}
      >
        {message !== '' ? (
          <Tooltip
            title="삭제"
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => {
              deleteUserLecture(timeList[day_index][time_index] - 1);
            }}
          >
            <IconButton>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
        <Typography>{message}</Typography>
        <Typography variant="body4">{position}</Typography>
      </TableCell>
    );
  };

  return <div>{renderTimeTable()}</div>;
};

export default TimeTable;
