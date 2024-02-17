from fastapi import APIRouter, UploadFile, HTTPException
from fastapi import APIRouter
from models.chat import Chat
from controllers.chatbot.chatbotSetup import rag

from openai import OpenAI
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post("/")
async def handle_chatbot_message(message: Chat):
    return rag(message.message)
