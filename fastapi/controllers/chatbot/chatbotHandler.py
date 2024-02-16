from time import sleep
import logging

from fastapi import APIRouter
from models.chat import Chat

router = APIRouter()




@router.post("/")
def handle_chatbot_message(message: Chat):
    sleep(3)
    return {"message": message}
