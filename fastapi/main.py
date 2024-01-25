from fastapi import FastAPI
from controllers.chatbot import chatbotHandler
from controllers.timetable import lectureHandler
from controllers.login import login

app = FastAPI()

app.include_router(chatbotHandler.router, prefix="/chatbot", tags=["chatBot"])
app.include_router(lectureHandler.router, prefix="/lecture", tags=["lecture"])
app.include_router(login.router, tags=["login"])