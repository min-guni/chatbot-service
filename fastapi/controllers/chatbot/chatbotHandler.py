from time import sleep
import logging

from fastapi import APIRouter
from models.message import Message

router = APIRouter()

fake_users_db = {
    "민균": {
        "name": "민균",
        "id" : "1",
        "password" : "123"
    },
    "성윤": {
        "name": "성윤",
        "id" : "2",
        "password" : "123"
    },
}


@router.post("/")
def handle_chatbot_message(message: Message):
    sleep(3)
    return {"message": message}
