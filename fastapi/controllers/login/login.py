from datetime import timedelta
from typing import Annotated

from fastapi import Depends, FastAPI, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from core import security
from core.config import settings
from core.security import verify_password
from models.token import Token
from models.user import User

fake_session_db = {
    "민균": {
        "name": "민균",
        "pwd": "1234",
        "id": 1,
        "is_active": True
    }
}

router = APIRouter()


@router.get("/login/access-token")
def login_access_token(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user_dict = fake_session_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect id or password")
    user = User(**user_dict)
    """
    if verify_password(form_data.password,user.pwd):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    """
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            user.id, expires_delta=access_token_expires
        )
    )
