from time import sleep
import logging

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class Message(BaseModel):
    message: str


@router.post("/")
def handle_chatbot_message(message: Message):
    sleep(3)
    return {"message": message}
