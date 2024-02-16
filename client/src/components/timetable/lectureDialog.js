import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { loadLectureDetail } from '../../service/timeTable/timeTableService';

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
        <DialogTitle id="alert-dialog-title">{lecture.course_name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {lecture.course_name} 입니다. 뭐가 들어갈지는 정해봅시다 꺌꺌 아무말 해볼게요
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default LectureDialog;
