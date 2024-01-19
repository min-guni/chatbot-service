import { get, getWithParam, post } from '../api/http';

export function loadUserLecture() {
  return get('saved-lecture');
}

export function saveTable(data) {
  return post('saved-lecture', data);
}

export function loadAllLecture() {
  return get('lecture');
}

export function searchLectures(param) {
  return getWithParam('lecture', param);
}
