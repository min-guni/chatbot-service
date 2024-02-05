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

import { lightBlue, blueGrey, lightGreen } from '@mui/material/colors';

const TimeTable = ({ lectureList }) => {
  const daysOfWeek = ['월', '화', '수', '목', '금'];
  const dayMap = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
  const colorList = [lightBlue[300], lightGreen[300]];

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
        timeList[dayMap[pairString[0]]][parseInt(time, 10) - 1] = index;
      });
    });
  };

  const renderTimeTable = () => {
    lectureList.map((lecture, index) => {
      parseLectureTime(lecture.lecture_time, index);
    });

    return (
      <TableContainer component={Paper}>
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
      console.log(day_index, time_index);
      console.log(timeList);
      message = lectureList[timeList[day_index][time_index]].lecture_name;
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
