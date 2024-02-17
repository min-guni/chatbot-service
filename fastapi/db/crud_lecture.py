from typing import Any, Dict, Optional, Union, List, Type

import sqlalchemy
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from models import sqlmodels

from models import lecture


def get_by_id(db: Session, *, username: str):
    return db.query(sqlmodels.Lecture).filter_by(username=username).all()


def save(db: Session, username: str, obj_in: lecture.Lecture):
    db_obj = sqlmodels.Lecture(lecture_id=obj_in.id, username=username, course_name=obj_in.course_name, course_code=obj_in.course_code,
                               subject_type=obj_in.subject_type,
                               campus=obj_in.campus, caution=obj_in.caution, classroom=obj_in.classroom,
                               semester=obj_in.semester,
                               grade=obj_in.grade, major=obj_in.major, instructor=obj_in.instructor,
                               schedule=obj_in.schedule)

    db.add(db_obj)
    db.commit()
    return db_obj


def delete(db : Session, username : str, lecture_id : str):
    db.query(sqlmodels.Lecture).filter_by(lecture_id=lecture_id, username=username).delete()
    db.commit()
    return