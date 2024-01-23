from fastapi import FastAPI
from controllers.chatbot import chatbotHandler
from controllers.timetable import lectureHandler

app = FastAPI()

app.include_router(chatbotHandler.router, prefix="/chatBot", tags=["chatBot"])
app.include_router(lectureHandler.router, prefix="/lecture", tags=["lecture"])