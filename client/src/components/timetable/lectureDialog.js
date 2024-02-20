import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadLectureDetail } from '../../service/timeTable/timeTableService';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import Face6Icon from '@mui/icons-material/Face6';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ErrorIcon from '@mui/icons-material/Error';

function ImageIcon() {
  return null;
}

const LectureDialog = ({ lectureId, dialogOpen, setDialogOpen }) => {
  const [lectureInfo, setLectureInfo] = useState({
    subject_type: ['전필'],
    course_name: ['자료구조'],
    campus: ['신촌'],
    classroom: ['공D504'],
    url: ['https://everytime.kr/lecture/view/943023'],
    course_desc: [
      ' Space and Time Complexity, Asymptotic Notation, Data Abstraction(ADT), Arrays, Stacks, Queues, Linked Lists, Trees(binary trees, heaps, binary search trees), Graphs (DFS, BFS, MST, shortest paths), Sorting, Hashing, Heap structures, Search Structures(AVL, trees, Red-Black trees, B_trees) 등을 다룬다.',
    ],
    schedule: ['수6/금5,6'],
    course_code: ['CCO2103-01-00'],
    instructor: ['안형찬'],
    major: ['인공지능융합대학 인공지능융합대학공통'],
    reviews: [
      {
        star: '3.0',
        review_semester: '23년 1학기 수강자',
        posvote: '0',
        review_text:
          '교수님은 착한대 학생이 나빠요 갓 \n송도에서 탈출했는데 시작부터 헬듣지말고 황자구로 도망가는걸 추천',
        course_name: '자료구조',
      },
    ],
    grade: ['2'],
    semester: ['2024-1학기'],
    caution: ['영어강의, 대면강의, 절대평가, 교환학생 수강 불가'],
  }); // 일단 연결 설정을 안해놨으므로 아무 데이터 넣어서 실험 ㄱㄱ
  useEffect(() => {
    loadLectureDetail(lectureId)
      .then((res) => {
        //setLectureInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle fontWeight="bold" id="alert-dialog-title">
          <Grid container columns={32}>
            <Grid item xs={31}>
              <Typography variant="h5">{lectureInfo.course_name}</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="delete" size="small">
                <ClearIcon
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                  fontSize="small"
                />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container columns={16}>
              <Grid item xs={8}>
                <List container direction="row">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ color: 'black', bgcolor: 'white' }}>
                        <Face6Icon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText sx={{ color: 'black' }}>{lectureInfo.instructor}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ color: 'black', bgcolor: 'white' }}>
                        <AutoStoriesIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ color: 'black' }}
                      style={{
                        whiteSpace: 'pre-line',
                      }}
                      primary={
                        '학정번호 : ' +
                        lectureInfo.course_code +
                        '\n' +
                        lectureInfo.major +
                        '\n' +
                        lectureInfo.subject_type +
                        ' ' +
                        lectureInfo.grade +
                        '학년 과목'
                      }
                    ></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ color: 'black', bgcolor: 'white' }}>
                        <PlaceIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText sx={{ color: 'black' }}>
                      {lectureInfo.campus} {lectureInfo.classroom} {lectureInfo.schedule}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ color: 'black', bgcolor: 'white' }}>
                        <ErrorIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText sx={{ color: 'black' }}>{lectureInfo.caution}</ListItemText>
                  </ListItem>
                  <Divider sx={{ color: 'black' }} />
                  <ListItem sx={{ color: 'black' }}>{lectureInfo.course_desc}</ListItem>
                </List>
              </Grid>
              <Grid item xs={8}>
                <List>
                  {lectureInfo.reviews.map((review, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Grid container xs={16}>
                                <Grid item xs={16}>
                                  <Rating name="read-only" value={review.star} readOnly />
                                </Grid>
                                <Grid item sx={16}>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                  >
                                    {review.review_semester}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                style={{
                                  whiteSpace: 'pre-line',
                                }}
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {review.review_text}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default LectureDialog;
