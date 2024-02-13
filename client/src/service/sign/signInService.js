import { post } from '../api/http';

export function signin(data) {
  return post('login/access-token', data);
}
