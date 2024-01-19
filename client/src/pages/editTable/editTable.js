import { useEffect, useState } from 'react';
import {
  loadAllLecture,
  loadUserLecture,
  searchLectures,
} from '../../service/timeTable/timeTableService';
import TimeTable from '../../components/timetable/timeTable';

const EditTable = () => {
  const [userLectureList, setUserLectureList] = useState([]);
  const [lectureList, setLectureList] = useState([]);
  useEffect(() => {
    loadUserLecture()
      .then((res) => {
        setUserLectureList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    loadAllLecture()
      .then((res) => {
        setLectureList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // user effect와 setInteveral로 1분간격으로 save 날리기 https://mingule.tistory.com/65
  const search = (event) => {
    searchLectures(event) //param을 넣어야됨 event대신
      .then((res) => {
        setLectureList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertLecture = (event) => {
    // 같은 시간에 있는지 없는지 확인
    // 같은 시간에 있으면 창을 띄움
  };

  const deleteLecture = (event) => {
    // 해당 lecture 삭제
  };

  return (
    <div>
      <TimeTable lectures={userLectureList} />
    </div>
  );
};
