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
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { blueGrey, lightBlue } from '@mui/material/colors';
import TelegramIcon from '@mui/icons-material/Telegram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Menu as MenuIcon } from '@mui/icons-material';
import LectureList from './lectureList';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const EditTable = () => {
  const theme = useTheme();
  const [userLectureList, setUserLectureList] = useState([
    { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
  ]);
  const [lectureList, setLectureList] = useState([
    { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
    { lecture_name: 'Math', lecture_time: 'Mon 9:00-10:00' },
  ]);

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" align="center">
            학교 시간표
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <TextField
          sx={{ width: '100%' }}
          fullwidth
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim() !== '') {
              search(e);
              e.target.value = '';
            }
          }}
        />
        <Box>
          <LectureList
            lectureList={[
              { lecture_name: 'Math', lecture_time: '월3,4,5/수4,5,6', professor: '윤민균' },
              { lecture_name: 'English', lecture_time: '화3,4/목4', professor: '윤민균' },
            ]}
          />
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <TimeTable
          lectureList={[
            { lecture_name: 'Math', lecture_time: '월3,4,5/수4,5,6' },
            { lecture_name: 'English', lecture_time: '화3,4/목4' },
          ]}
        />
      </Main>
    </div>
  );
};

export default EditTable;
