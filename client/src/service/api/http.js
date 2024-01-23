import axios from 'axios';

let url = 'http://localhost:5000/api/';
//섹션 로그인 기능
export function get(link) {
  return axios.get(url + link);
}

export function getWithParam(link, param) {
  return axios.get(url + link, { params: param });
}

export function post(link, data) {
  return axios.post(url + link, data);
}
