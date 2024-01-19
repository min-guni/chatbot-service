import { post } from '../api/http';

export function postChatBot(data) {
  return post('chatBot', data);
}
