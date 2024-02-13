import React, { useEffect, useState } from 'react';
import {
  loadAllLecture,
  loadUserLecture,
  searchLectures,
} from '../../service/timeTable/timeTableService';
import TimeTable from './timeTable';
import {
  AppBar,
  Backdrop,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { debounce } from 'lodash';
import SearchIcon from '@mui/icons-material/Search';
import LectureList from './lectureList';

const EditTable = () => {
  const theme = useTheme();
  const [userLectureList, setUserLectureList] = useState([]);
  const [lectureList, setLectureList] = useState([]);
  const [priorityLecture, setPriorityLecture] = useState(null);

  const [open, setOpen] = useState(false);

  // user effect와 setInteveral로 1분간격으로 save 날리기 https://mingule.tistory.com/65
  const textChange = (query) => {
    search(query);
  };

  const search = debounce((query) => {
    console.log(query);
    if (query.trim() === '') {
      setLectureList([]);
      return;
    }
    const param = { q: query };
    console.log(param);
    searchLectures(param) //param을 넣어야됨 event대신
      .then((res) => {
        setLectureList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1);

  const insertLecture = (event) => {
    // 같은 시간에 있는지 없는지 확인
    // 같은 시간에 있으면 창을 띄움
  };

  const deleteLecture = (event) => {
    // 해당 lecture 삭제
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TIME TABLE
          </Typography>
          <TextField
            hiddenLabel
            fullwidth
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onClick={() => {
              setOpen(true);
            }}
          />
        </Toolbar>
      </AppBar>
      <TimeTable lectureList={userLectureList} priority_lecture={priorityLecture} />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth="lg"
        maxWidth="lg"
        PaperProps={{
          style: {
            backgroundColor:
              priorityLecture !== null ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)', // Adjust the alpha value for transparency
          },
        }}
      >
        <DialogTitle>Search Lectures</DialogTitle>
        <DialogContent dividers>
          <TextField
            hiddenLabel
            fullWidth
            variant="standard"
            onChange={(e) => {
              textChange(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <LectureList
            lectureList={lectureList}
            updateInstanceLecture={setPriorityLecture}
            setUserLectureList={setUserLectureList}
          ></LectureList>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTable;
