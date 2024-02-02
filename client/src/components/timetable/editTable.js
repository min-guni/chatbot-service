import React, { useEffect, useState } from 'react';
import {
  loadAllLecture,
  loadUserLecture,
  searchLectures,
} from '../../service/timeTable/timeTableService';
import TimeTable from './timeTable';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { blueGrey, lightBlue } from '@mui/material/colors';
import TelegramIcon from '@mui/icons-material/Telegram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const EditTable = () => {
  const [userLectureList, setUserLectureList] = useState([
    { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
  ]);
  const [lectureList, setLectureList] = useState([
    { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
    { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
  ]);
  useEffect(() => {
    loadUserLecture()
      .then((res) => {
        setUserLectureList([{ lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' }]);
      })
      .catch((err) => {
        console.error(err);
      });
    loadAllLecture()
      .then((res) => {
        //setLectureList(res.data);
        setLectureList([
          { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
          { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // user effect와 setInteveral로 1분간격으로 save 날리기 https://mingule.tistory.com/65
  const search = (event) => {
    searchLectures(event) //param을 넣어야됨 event대신
      .then((res) => {
        setLectureList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertLecture = (event) => {
    // 같은 시간에 있는지 없는지 확인
    // 같은 시간에 있으면 창을 띄움
  };

  const deleteLecture = (event) => {
    // 해당 lecture 삭제
  };

  return (
    <div>
      <Grid container alignItems="stretch">
        <Grid item xs={4}>
          <Paper>
            <TextField
              sx={{ width: '100%' }}
              fullwidth
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  search(e);
                  e.target.value = '';
                }
              }}
            ></TextField>
            <List>
              {lectureList.map((lecture, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          fontWeight="bold"
                          variant="body1"
                          color="text.primary"
                        >
                          {lecture.lecture_name}
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
                            {lecture.lecture_time}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <TimeTable
            lectureList={[
              { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
              { lecture_name: 'English', lecture_time: 'Fri 9:00-10:00' },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EditTable;
