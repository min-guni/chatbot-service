import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { animationMixin } from '../effect/Animation';

// 레이아웃 컴포넌트
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  ${animationMixin};
`;

const TimeTable = ({ lectureList = [] }) => {
  const daysOfWeek = ['월', '화', '수', '목', '금'];
  const dayMap = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
  const colorList = [
  'linear-gradient(to right, #ff9a9e, #fad0c4)',
  'linear-gradient(to right, #a18cd1, #fbc2eb)',
  'linear-gradient(to right, #fad0c4, #ffd1ff)',
  'linear-gradient(to right, #ffecd2, #fcb69f)',
  'linear-gradient(to right, #a1c4fd, #c2e9fb)',
  'linear-gradient(to right, #d4fc79, #96e6a1)',
  'linear-gradient(to right, #84fab0, #8fd3f4)',
  'linear-gradient(to right, #cfd9df, #e2ebf0)',
  'linear-gradient(to right, #a6c0fe, #f68084)',
  'linear-gradient(to right, #fccb90, #d57eeb)',
];

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
      <TableContainer component={Paper} style={{ width: '50vw',  display:'flex', height: '50%' }}>
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{timeSlot}</TableCell>
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
      return <TableCell key={`${day_index}-${time_index}`}></TableCell>;
    }
    let message = '';
    if (
      time_index === 0 ||
      timeList[day_index][time_index - 1] !== timeList[day_index][time_index]
    ) {
      message = lectureList[timeList[day_index][time_index] - 1].course_name;
    }

    return (
      <TableCell
        key={`${day_index}-${time_index}`}
        align="center"
        sx={{ background:colorList[timeList[day_index][time_index] % colorList.length]}}
      >
        <Typography>{message}</Typography>
      </TableCell>
    );
  };

  return <div>{renderTimeTable()}</div>;
};

export default TimeTable;
