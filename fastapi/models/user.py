import bcrypt
from fastapi import FastAPI
from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str

    class Config:
        orm_mode = True


class UserOut(User):
    username: str
