import { post } from '../api/http';

export function signup(data) {
  return post('user/', data);
}
