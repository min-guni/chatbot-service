from datetime import datetime
from typing import Any, Dict, Optional, Union, List, Type

import sqlalchemy
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from models import sqlmodels

from models import chat


def get_by_id(db: Session, *, username: str):
    return db.query(sqlmodels.Chat).filter_by(username=username).order_by(sqlmodels.Chat.time.asc()).all()


def save(db: Session, username : str, obj_in: chat.Chat, is_chatbot : bool):
    db_obj = sqlmodels.Chat(username = username,message=obj_in.message,time=datetime.now(), is_chatbot=is_chatbot)
    db.add(db_obj)
    db.commit()
    return db_obj
