import { deleteWithToken, get, getWithParam, getWithToken, post, postWithToken } from '../api/http';

export function loadUserLecture(token) {
  return getWithToken('lecture/me', token);
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

export function saveLecture(lecture, token) {
  return postWithToken('lecture/', lecture, token);
}

export function deleteLecture(lecture_id, token) {
  return deleteWithToken('lecture/', lecture_id, token);
}
