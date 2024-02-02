import bcrypt
from fastapi import FastAPI
from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class UserOut(User):
    username: str
