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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LectureList = ({ lectureList, updateInstanceLecture }) => {
  const [expandedDiv, setExpandedDiv] = useState(false);

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
    <div>
      {lectureList.map((lecture, index) => (
        <Accordion
          key={index}
          expanded={expandedDiv === index}
          onChange={handleExpandChange(index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
          >
            <Typography>{lecture.course_name}</Typography>
            <Typography>{lecture.course_code}</Typography>
            <Typography>{lecture.instructor}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{lecture.source_code}</Typography>
            <Typography>{lecture.classroom}</Typography>
            <Typography>{lecture.caution}</Typography>
            <Button variant="outlined" onClick={() => handleOpen(index)}>
              Show Detail
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleOpen(index)}
              onMouseOver={() => {
                updateInstanceLecture(lecture);
                console.log(lecture);
              }}
              onMouseOut={() => updateInstanceLecture(null)}
            >
              Add to Table
            </Button>
          </AccordionDetails>
          <Dialog
            open={openInfo === index}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{lecture.course_name}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {lecture.course_name} 입니다. 뭐가 들어갈지는 정해봅시다 꺌꺌 아무말 해볼게요
              </DialogContentText>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </Accordion>
      ))}
    </div>
  );
};

export default LectureList;
