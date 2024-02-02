from fastapi import FastAPI
from controllers.chatbot import chatbotHandler
from controllers.timetable import lectureHandler
from controllers.login import login, user

app = FastAPI()

app.include_router(chatbotHandler.router, prefix="/chatbot", tags=["chatBot"])
app.include_router(lectureHandler.router, prefix="/lecture", tags=["lecture"])
app.include_router(login.router, tags=["login"])
app.include_router(user.router, prefix="/user", tags=["user"])