from time import sleep
import logging

from fastapi import APIRouter
from models.message import Message

router = APIRouter()




@router.post("/")
def handle_chatbot_message(message: Message):
    sleep(3)
    return {"message": message}
