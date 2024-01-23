import bcrypt
from fastapi import FastAPI
from pydantic import BaseModel


class User(BaseModel):
    name: str
    pwd: str
    id: int

    def hash_password(self) -> None:
        salt = bcrypt.gensalt(10)
        hashed_pwd = bcrypt.hashpw(self.pwd.encode('utf-8'), salt)
        self.pwd = hashed_pwd.decode('utf-8')

    def create(self) -> None:
        self.hash_password()
        # id 설정

        # db 연결

    def user_id_unique(self) -> bool:
        return True

    def delete_by_id(self) -> bool:
        return True
