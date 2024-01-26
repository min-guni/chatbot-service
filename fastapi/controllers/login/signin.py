from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from core.security import get_current_user, SessionDep, CurrentUser
from db import crud_user
from db.crud_user import get_by_id, create, update
from models.user import User, UserOut

router = APIRouter()




@router.post(
    "/", dependencies=[Depends(get_current_user)], response_model=UserOut
)
def create_user(*, session: SessionDep, user_in: User) -> Any:
    """
    Create new user.
    """
    user = get_by_id(session, id=User.id)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )

    user = create(db=session, obj_in=user_in)
    return user


@router.put("/me", response_model=UserOut)
def update_user_me(
        *, session: SessionDep, body: UserUpdateMe, current_user: CurrentUser
) -> Any:
    """
    Update own user.
    """
    # TODO: Refactor when SQLModel has update
    # current_user_data = jsonable_encoder(current_user)
    # user_in = UserUpdate(**current_user_data)
    # if password is not None:
    #     user_in.password = password
    # if full_name is not None:
    #     user_in.full_name = full_name
    # if email is not None:
    #     user_in.email = email
    # user = crud.user.update(session, session_obj=current_user, obj_in=user_in)
    # return user


@router.get("/me", response_model=UserOut)
def read_user_me(session: SessionDep, current_user: CurrentUser) -> Any:
    """
    Get current user.
    """
    return current_user





@router.get("/{user_id}", response_model=UserOut)
def read_user_by_id(
        user_id: int, session: SessionDep, current_user: CurrentUser
) -> Any:
    """
    Get a specific user by id.
    """
    user = session.get(User, user_id)
    if user == current_user:
        return user
    if not current_user.is_superuser:
        raise HTTPException(
            # TODO: Review status code
            status_code=400,
            detail="The user doesn't have enough privileges",
        )
    return user


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
    """
    Update a user.
    """

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    user = update(session, db_obj=user, obj_in=user_in)
    return user
