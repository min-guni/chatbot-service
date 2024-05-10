from typing import Union

from pydantic import BaseModel


class TokenPayload(BaseModel):
    sub: Union[int, None] = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
