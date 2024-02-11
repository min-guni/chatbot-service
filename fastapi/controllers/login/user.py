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
    print(user_in.username, user_in.password)
    user = get_by_id(session, username=user_in.username)
    print(user)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system."
        )

    user = create(db=session, obj_in=user_in)
    return user


@router.put("/me", response_model=UserOut)
def update_user_me(
        *, session: SessionDep, body: User, current_user: CurrentUser
) -> Any:
    current_user_data = jsonable_encoder(current_user)
    user_in = User(**current_user_data)
    if body.password is not None:
        user_in.password = body.password
    if body.name is not None:
        user_in.full_name = body.name
    user = update(session, db_obj=user_in, obj_in=user_in)
    return user


@router.get("/me", response_model=UserOut)
def read_user_me(session: SessionDep, current_user: CurrentUser) -> Any:
    return current_user


"""
@router.put(
    "/{user_id}",
    dependencies=[Depends(get_current_user)],
    response_model=UserOut,
)
def update_user(
        *,
        session: SessionDep,
        user_id: int,
        user_in: User,
) -> Any:
    

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    user = update(session, db_obj=user, obj_in=user_in)
    return user
"""
