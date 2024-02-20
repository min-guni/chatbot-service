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
  ListItemText,
  Rating,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { loadLectureDetail } from '../../service/timeTable/timeTableService';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';

const LectureDialog = ({ lectureId }) => {
  const [lectureInfo, setLectureInfo] = useState(null); // 일단 연결 설정을 안해놨으므로 아무 데이터 넣어서 실험 ㄱㄱ
  useEffect(() => {
    loadLectureDetail(lectureInfo.id)
      .then((res) => {
        setLectureInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Dialog
        open={openInfo === index}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid columns={16}>
            <Grid xs={14}>
              <Item>
                <IconButton aria-label="delete" size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Item>
            </Grid>
            <Grid xs={2}>
              <Item></Item>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid rows={16}>
              <Grid xs={8}>
                <Grid colums={16}>
                  <Grid>
                    <Typography>{lectureInfo.instructor}</Typography>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Typography>
                      {lectureInfo.course_code} {lectureInfo.major} {lectureInfo.subject_type}
                      {lectureInfo.grade}
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Typography>
                      {lectureInfo.campus} {lectureInfo.classroom} {lectureInfo.schedule}
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Typography>{lectureInfo.caution}</Typography>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Typography>{lectureInfo.course_desc}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={8}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {lectureInfo.reviews.map((review, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Rating name="read-only" value={review.star} readOnly />
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body3"
                                color="text.primary"
                              >
                                {review.review_semester}
                              </Typography>
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
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
                      <Divider variant="inset" component="li" />
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
