import logging
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder

from core.security import get_current_user, SessionDep, CurrentUser
from db.crud_user import get_by_id, create, update
from models.user import User, UserOut

router = APIRouter()


@router.post(
    "/", response_model=UserOut
)
def create_user(session: SessionDep, user_in: User) -> Any:
    user = get_by_id(session, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system."
        )

    user = create(db=session, obj_in=user_in)
    return user


@router.get("/me", response_model=str)
def get_user_me(
        *, session: SessionDep, current_user: CurrentUser
) -> Any:
    return current_user.username


