import { get, getWithParam, post } from '../api/http';

export function loadUserLecture() {
  return get('saved-lecture'); // 나중에 user 하면 바꿀 예정
}

export function saveTable(data) {
  return post('saved-lecture', data);
}

export function loadAllLecture() {
  return get('lecture');
}

export function searchLectures(param) {
  return getWithParam('lecture/', param);
}

export function loadLectureDetail(id) {
  return get('lecture/detail/' + id);
}
