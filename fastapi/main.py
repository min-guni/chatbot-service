from fastapi import FastAPI
from controllers.chatbot import chatbotHandler
from controllers.timetable import lectureHandler
from controllers.login import login, user
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from db.engine import engine
from models import sqlmodels

sqlmodels.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbotHandler.router, prefix="/chatbot", tags=["chatBot"])
app.include_router(lectureHandler.router, prefix="/lecture", tags=["lecture"])
app.include_router(login.router, tags=["login"])
app.include_router(user.router, prefix="/user", tags=["user"])


