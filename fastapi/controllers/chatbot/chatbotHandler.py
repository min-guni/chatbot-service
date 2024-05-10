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
    try:
        chatbot_message = rag(message.message)
        # Ensure chatbot_message is not None and is a string
        if chatbot_message is None or not isinstance(chatbot_message, str):
            raise ValueError("Chatbot failed to generate a valid message.")
    except Exception as e:
        # Log the error or handle it as needed
        print(f"Error generating chatbot message: {e}")
        # Consider returning a default message or handling the error appropriately
        chatbot_message = "Sorry, I couldn't understand that."

    save(session, current_user.username, Chat(message=chatbot_message), True)
    return chatbot_message


@router.get("/", response_model=list[ChatOut])
def load_chatbot_message(session: SessionDep, current_user: CurrentUser):
    loaded_chatbot_list = get_by_id(session, username=current_user.username)
    output_list = [ChatOut(message=loaded_chatbot.message, id=int(loaded_chatbot.is_chatbot)) for loaded_chatbot in loaded_chatbot_list]
    return output_list
