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
  ListSubheader,
  Paper,
  Rating,
  Slider,
  Stack,
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

import { red, blue } from '@mui/material/colors';
import { PieChart } from '@mui/x-charts';

function ImageIcon() {
  return null;
}

const LectureDialog = ({ lectureId, dialogOpen, setDialogOpen }) => {
  const [lectureInfo, setLectureInfo] = useState(null); // 일단 연결 설정을 안해놨으므로 아무 데이터 넣어서 실험 ㄱㄱ
  useEffect(() => {
    loadLectureDetail(lectureId)
      .then((res) => {
        setLectureInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lectureId]);

  return (
    <div>
      {lectureInfo !== null ? (
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
                <Typography fontWeight="bold" variant="h5">
                  {lectureInfo.course_name}
                </Typography>
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
                <Grid
                  item
                  xs={8}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {lectureInfo.reviews.length === 0 || lectureInfo.reviews.length === null ? (
                    <Typography style={{ verticalAlign: 'middle' }} align="center">
                      해당 강의에 리뷰가 존재하지 않습니다.
                    </Typography>
                  ) : (
                    <List
                      sx={{
                        maxHeight: 80 + `vh`,
                        overflow: 'auto',
                      }}
                    >
                      <ListItem>
                        <Stack>
                          <Grid container>
                            <Grid item xs={9}>
                              <Typography fontWeight="bold" variant="h5" sx={{ color: 'black' }}>
                                {'평점 : ' + lectureInfo.star_avg}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Rating
                                name="read-only"
                                value={lectureInfo.star_avg}
                                precision={0.1}
                                readOnly
                              />
                            </Grid>
                          </Grid>
                          <Paper elevation={0} sx={{ margin: 5 }}>
                            <PieChart
                              series={[
                                {
                                  data: [
                                    { id: 0, value: lectureInfo.pros, label: '긍정' },
                                    { id: 1, value: lectureInfo.cons, label: '부정' },
                                  ],
                                },
                              ]}
                              width={400}
                              height={200}
                              style={{ margin: 5 }}
                            />
                          </Paper>
                        </Stack>
                      </ListItem>
                      {lectureInfo.reviews.map((review, index) => (
                        <React.Fragment key={index}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{
                              bgcolor: review.is_positive === 'positive' ? blue[50] : red[50],
                            }}
                          >
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
                  )}
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : (
        ''
      )}
    </div>
  );
};

export default LectureDialog;
