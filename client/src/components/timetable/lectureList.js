import { useState } from 'react';
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

const LectureList = ({ lectureList }) => {
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
            <Typography>{lecture.lecture_name}</Typography>
            <Typography>{lecture.professor}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>추가 정보를 표시하세요.</Typography>
            <Button variant="outlined" onClick={() => handleOpen(index)}>
              Show Detail
            </Button>
            <Button variant="outlined" onClick={() => handleOpen(index)}>
              Add to Table
            </Button>
          </AccordionDetails>
          <Dialog
            open={openInfo === index}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{lecture.lecture_name}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {lecture.lecture_name} 입니다. 뭐가 들어갈지는 정해봅시다 꺌꺌 아무말 해볼게요
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
