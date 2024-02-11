from typing import Any, Dict, Optional, Union

import sqlalchemy
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from models import sqlmodels, user


def get_by_id(db: Session, *, username: str) -> Optional[sqlmodels.User]:
    return db.query(sqlmodels.User).filter_by(username=username).first()


def create(db: Session, *, obj_in: user.User) -> sqlmodels.User:
    db_obj = sqlmodels.User(
        username=obj_in.username,
        password=get_password_hash(obj_in.password)
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update(db: Session, *, db_obj: sqlmodels.User, obj_in: Union[user.User, Dict[str, Any]]) -> sqlmodels.User:
    if isinstance(obj_in, dict):
        update_data = obj_in
    else:
        update_data = obj_in.model_dump(exclude_unset=True)
    if update_data["password"]:
        hashed_password = get_password_hash(update_data["password"])
        del update_data["password"]
        update_data["hashed_password"] = hashed_password

    obj_data = jsonable_encoder(db_obj)
    for field in obj_data:
        if field in update_data:
            setattr(db_obj, field, update_data[field])
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def authenticate(db: Session, *, username: str, password: str) -> Optional[sqlmodels.User]:
    user = get_by_id(db, username=username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
