import { useEffect, useState } from 'react';
import { get } from '../api/http';
import { loadMyLecture } from '../../service/timeTable/timeTableService';

const TimeTable = (userLectureList) => {
  const draw = () => {
    return '<div> userLecturelist로 알아서 잘 그려라</div>';
  };

  return <div>{draw}</div>;
};

export default TimeTable;
