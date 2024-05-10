from pydantic import BaseModel


class Chat(BaseModel):
    message: str


class ChatOut(Chat):
    id: int # 0 이면 사용자 1이면 챗봇