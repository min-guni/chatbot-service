from fastapi import APIRouter, UploadFile, HTTPException
from fastapi import APIRouter

from core.security import CurrentUser, SessionDep
from db.crud_chat import save, get_by_id
from models.chat import Chat, ChatOut
from controllers.chatbot.chatbotSetup import rag

from openai import OpenAI
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post("/", response_model=str)
def handle_chatbot_message(session: SessionDep, message: Chat, current_user: CurrentUser):
    save(session, current_user.username, message, False)
    chatbot_message = rag(message.message)
    save(session, current_user.username, Chat(message=chatbot_message), True)
    return chatbot_message


@router.get("/", response_model=list[ChatOut])
def load_chatbot_message(session: SessionDep, current_user: CurrentUser):
    loaded_chatbot_list = get_by_id(session, username=current_user.username)
    output_list = [ChatOut(message=loaded_chatbot.message, id=int(loaded_chatbot.is_chatbot)) for loaded_chatbot in loaded_chatbot_list]
    return output_list
