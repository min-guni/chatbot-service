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

import { lightBlue, blueGrey, lightGreen, grey, cyan, brown } from '@mui/material/colors';

const TimeTable = ({ lectureList, priority_lecture }) => {
  const daysOfWeek = ['월', '화', '수', '목', '금'];
  const dayMap = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
  const colorList = [grey[300], lightBlue[300], lightGreen[300], cyan[300], brown[300]];

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
        console.log(time);
        timeList[dayMap[pairString[0]]][parseInt(time, 10) - 1] = index + 1;
      });
    });
  };

  const renderTimeTable = () => {
    lectureList.map((lecture, index) => {
      parseLectureTime(lecture.schedule, index);
    });
    console.log(priority_lecture);
    if (priority_lecture !== null) {
      parseLectureTime(priority_lecture.schedule, -1);
    }

    return (
      <TableContainer component={Paper} style={{ width: '100vw' }}>
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
      if (timeList[day_index][time_index] === 0) {
        message = priority_lecture.course_name;
      } else {
        message = lectureList[timeList[day_index][time_index] - 1].course_name;
      }
    }

    return (
      <TableCell
        key={`${day_index}-${time_index}`}
        align="center"
        sx={{ backgroundColor: colorList[timeList[day_index][time_index]] }}
      >
        <Typography>{message}</Typography>
      </TableCell>
    );
  };

  return <div>{renderTimeTable()}</div>;
};

export default TimeTable;
