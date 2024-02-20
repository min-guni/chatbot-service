import { useState, useEffect } from 'react';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LectureDialog from './lectureDialog';

const LectureList = ({ lectureList, updateInstanceLecture, setUserLectureList, saveLecture }) => {
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

  const [isHover, setIsHover] = useState(true);

  useEffect(() => {
    setExpandedDiv(false);
  }, [lectureList]);

  return (
    <div style={{ height: 60 + `vh`, marginTop: 20 }}>
      {lectureList.map((lecture, index) => (
        <Accordion
          //elevation={0}
          key={index}
          expanded={expandedDiv === index}
          onChange={handleExpandChange(index)}
          sx={{
            backgroundColor: isHover ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)', // Adjust the alpha value for transparency
            //border: '10px solid #000000'',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
          >
            <Typography sx={{ width: '20%', flexShrink: 0 }}>
              {lecture.course_code + ' '}
            </Typography>
            <Typography sx={{ width: '20%', flexShrink: 0 }}>
              {lecture.course_name + ' '}
            </Typography>
            <Typography>{lecture.instructor + ' '}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{lecture.source_code}</Typography>
            <Typography>{lecture.classroom}</Typography>
            <Typography>{lecture.caution}</Typography>
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
              onMouseOver={() => {
                updateInstanceLecture(lecture);
                setIsHover(true);
              }}
              onMouseOut={() => updateInstanceLecture(null)}
            >
              Add to Table
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
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
