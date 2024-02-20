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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LectureDialog from './lectureDialog';
import Grid from '@mui/material/Grid';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Face6Icon from '@mui/icons-material/Face6';
import Avatar from '@mui/material/Avatar';

const LectureList = ({ lectureList, setUserLectureList, saveLecture }) => {
  const [expandedDiv, setExpandedDiv] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailLecture, setDetailLecture] = useState(null);

  const [openInfo, setOpenInfo] = useState(false);
  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpandedDiv(isExpanded ? panel : false);
  };
  const handleClose = () => {
    setOpenInfo(false);
  };
  const handleOpen = (index) => {
    setOpenInfo(index);
    console.log(index);
  };

  useEffect(() => {
    setExpandedDiv(false);
  }, [lectureList]);

  return (
    <div style={{ height: 60 + `vh`, marginTop: 20 }}>
      <Card
        elevation="0"
        sx={{
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Grid container>
          <Grid item xs={2.35}>
            <Chip sx={{ padding: 1 }} icon={<NumbersIcon />} color="primary" label="학정 번호" />
          </Grid>
          <Grid item xs={3.4}>
            <Chip
              sx={{ paddingLeft: 2, paddingRight: 1, paddingBottom: 1, paddingTop: 1 }}
              icon={<ImportContactsIcon />}
              label="강의명"
              color="primary"
            />
          </Grid>
          <Grid item>
            <Chip sx={{ padding: 1 }} icon={<PersonIcon />} label="교수명" color="primary">
              교수명
            </Chip>
          </Grid>
        </Grid>
      </Card>
      <div>
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
              <Typography>{'강의 시간 : ' + lecture.schedule}</Typography>
              <Typography>{'강의실 : ' + lecture.classroom}</Typography>
              <Typography>{'주의 사항 : ' + lecture.caution}</Typography>
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
                  setUserLectureList((list) => [...list, lecture]); //여기서 체크 해야됨;;
                  saveLecture(lecture);
                  handleOpen(index);
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
    </div>
  );
};

export default LectureList;
