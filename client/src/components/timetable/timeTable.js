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

const TimeTable = ({ lectureList }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
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

  const parseLectureTime = (lectureTime) => {
    const dayTimePairs = lectureTime.split(' ');
    const parsedData = [];

    for (let i = 0; i < dayTimePairs.length; i += 2) {
      parsedData.push({ day: dayTimePairs[i], time: dayTimePairs[i + 1] });
    }

    return parsedData;
  };

  const renderTimeTable = () => {
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
            {timeSlots.map((timeSlot) => (
              <TableRow key={timeSlot} style={{ height: '9vh' }}>
                <TableCell>{timeSlot}</TableCell>
                {daysOfWeek.map((day) => (
                  <TableCell key={`${day}-${timeSlot}`} align="center">
                    {renderLecturesForCell(day, timeSlot)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // 시간표에 수업을 렌더링하는 함수
  const renderLecturesForCell = (day, timeSlot) => {
    const lectures = lectureList.filter((lec) => {
      const parsedLectureTime = parseLectureTime(lec.lecture_time);
      return parsedLectureTime.some((dayTime) => dayTime.day === day && dayTime.time === timeSlot);
    });

    return lectures.map((lecture, index) => (
      <Typography key={index}>{lecture.lecture_name}</Typography>
    ));
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        학교 시간표
      </Typography>
      {renderTimeTable()}
    </div>
  );
};

export default TimeTable;
