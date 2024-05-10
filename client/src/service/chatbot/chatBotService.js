import { getWithToken, postWithToken } from '../api/http';

export function postChatBot(data) {
  data = { message: data };
  return postWithToken('chatbot/', data);
}

export function getChat() {
  return getWithToken('chatbot/');
}
