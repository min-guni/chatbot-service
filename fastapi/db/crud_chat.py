from datetime import datetime
from typing import Any, Dict, Optional, Union, List, Type

import sqlalchemy
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from models import sqlmodels

from models import chat


def get_by_id(db: Session, *, username: str):
    return db.query(sqlmodels.Chat).filter_by(username=username).order_by(sqlmodels.Chat.time.desc()).all()


def save_lecture(db: Session, username : str, obj_in: chat.Chat):
    db_obj = sqlmodels.Chat(username = username,message=obj_in.message,time=datetime.now())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
