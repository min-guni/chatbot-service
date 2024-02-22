import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
  AccordionActions,
  Card,
  CardContent,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  MenuItem,
  Menu,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LectureDialog from './lectureDialog';
import Grid from '@mui/material/Grid';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Face6Icon from '@mui/icons-material/Face6';
import Avatar from '@mui/material/Avatar';
import ErrorIcon from '@mui/icons-material/Error';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SearchIcon from '@mui/icons-material/Search';
import { createGlobalStyle } from 'styled-components';

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

const LectureList = ({ lectureList, setUserLectureList, userLectureList, saveLecture }) => {
  const [expandedDiv, setExpandedDiv] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailLecture, setDetailLecture] = useState(null);
  const [successDialog, setSuccessDialog] = useState(0); // 1은 성공 2는 실패

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpandedDiv(isExpanded ? panel : false);
  };

  const lecture2formatedList = (lecture_schedule) => {
    let returnList = [];
    let dayTimePairs = lecture_schedule.split('/');
    dayTimePairs.forEach((pairString) => {
      const time = pairString.split(/[^0-9]/).filter(Boolean);
      time.forEach((time) => {
        returnList.push(pairString[0] + time);
      });
    });
    return returnList;
  };

  useEffect(() => {
    setExpandedDiv(false);
  }, [lectureList]);

  return (
    <div style={{ height: 60 + `vh`, marginTop: 20 }}>
      <AllGlobalStyle />
      {lectureList.length !== 0 ? (
        <Card
          elevation="0"
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <Grid container>
            <Grid item xs={2.35}>
              <Chip
                style={{
                  background: 'linear-gradient(to right, #f2f7d3, #f9dcdc',
                  color: '#4f5963',
                }}
                sx={{ padding: 1 }}
                icon={<NumbersIcon />}
                color="primary"
                label="학정 번호"
              />
            </Grid>
            <Grid item xs={3.4}>
              <Chip
                style={{
                  background: 'linear-gradient(to right, #f2f7d3, #f9dcdc',
                  color: '#4f5963',
                }}
                sx={{ paddingLeft: 2, paddingRight: 1, paddingBottom: 1, paddingTop: 1 }}
                icon={<ImportContactsIcon />}
                label="강의명"
                color="primary"
              />
            </Grid>
            <Grid item>
              <Chip
                style={{
                  background: 'linear-gradient(to right, #f2f7d3, #f9dcdc',
                  color: '#4f5963',
                }}
                sx={{ padding: 1 }}
                icon={<PersonIcon />}
                label="교수명"
                color="primary"
              >
                교수명
              </Chip>
            </Grid>
          </Grid>
        </Card>
      ) : (
        ''
      )}
      <div style={{ maxHeight: `calc(60vh - 40px)`, overflowY: 'auto' }}>
        {lectureList.map((lecture, index) => (
          <Accordion
            key={index}
            expanded={expandedDiv === index}
            onChange={handleExpandChange(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel-${index}-header`}>
              <Typography sx={{ width: '20%', flexShrink: 0 }}>
                {lecture.course_code + ' '}
              </Typography>
              <Typography sx={{ width: '30%', flexShrink: 0 }}>
                {lecture.course_name + ' '}
              </Typography>
              <Typography>{lecture.instructor + ' '}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ color: 'black', bgcolor: 'white' }}>
                      <AccessAlarmIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText sx={{ color: 'black' }}>
                    {'강의 시간 : ' + lecture.schedule}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ color: 'black', bgcolor: 'white' }}>
                      <CorporateFareIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText sx={{ color: 'black' }}>
                    {'강의실 : ' + lecture.classroom}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ color: 'black', bgcolor: 'white' }}>
                      <ErrorIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText sx={{ color: 'black' }}>
                    {'주의사항 : ' + lecture.caution}
                  </ListItemText>
                </ListItem>
              </List>
            </AccordionDetails>
            <AccordionActions>
              <Button
                onClick={() => {
                  setDetailLecture(lecture.id);
                  setOpenDialog(true);
                }}
              >
                Show Detail
              </Button>
              <Button
                onClick={() => {
                  let lecture_schedule = lecture2formatedList(lecture.schedule);
                  let flag = false;

                  userLectureList.forEach((userLecture) => {
                    let user_lecture_schedule = lecture2formatedList(userLecture.schedule);
                    lecture_schedule.forEach((lecture_schudule_element) => {
                      if (user_lecture_schedule.includes(lecture_schudule_element)) {
                        setSuccessDialog(2);
                        flag = true;
                      }
                    });
                  });

                  if (!flag) {
                    setUserLectureList((list) => [...list, lecture]); //여기서 체크 해야됨;;
                    saveLecture(lecture);
                    setSuccessDialog(1);
                  }
                }}
              >
                Add to Table
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
      {detailLecture !== null ? (
        <LectureDialog
          lectureId={detailLecture}
          setDialogOpen={setOpenDialog}
          dialogOpen={openDialog}
        />
      ) : (
        ''
      )}
      {successDialog === 1 || successDialog === 2 ? (
        <Snackbar
          open={successDialog > 0}
          autoHideDuration={6000}
          onClose={() => {
            setSuccessDialog(0);
          }}
        >
          {successDialog === 1 ? (
            <Alert
              onClose={() => {
                setSuccessDialog(0);
              }}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              강의가 시간표에 저장되었습니다.
            </Alert>
          ) : (
            <Alert
              onClose={() => {
                setSuccessDialog(0);
              }}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              이미 같은 시간에 다른 과목이 있습니다. 해당 과목을 삭제 후 저장해주세요.
            </Alert>
          )}
        </Snackbar>
      ) : null}
    </div>
  );
};

export default LectureList;
