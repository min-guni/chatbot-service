from typing import Union

from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime, Text
from sqlalchemy.orm import relationship

from db.engine import Base


# Shared properties
class User(Base):
    __tablename__ = "users"

    username = Column(String, primary_key=True)
    password = Column(String)


class Lecture(Base):
    __tablename__ = "lectures"

    username = Column(String, ForeignKey("users.id"))
    course_name = Column(String)
    course_code = Column(String, index=True)
    schedule = Column(String)
    instructor = Column(String)
    campus = Column(String)
    caution = Column(String)
    classroom = Column(String)
    grade = Column(String)
    major = Column(String)
    semester = Column(String)
    subject_type = Column(String)


class Chat(Base):
    __tablename__ = "chats"

    username = Column(String, ForeignKey("users.ud"))
    message = Column(Text)
    time = Column(DateTime, index=True)