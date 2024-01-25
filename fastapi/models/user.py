import bcrypt
from fastapi import FastAPI
from pydantic import BaseModel


class User(BaseModel):
    name: str
    pwd: str
    id: str


