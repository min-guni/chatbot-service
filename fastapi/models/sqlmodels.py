from typing import Union

from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime, Text, Integer
from sqlalchemy.orm import relationship

from db.engine import Base


# Shared properties
class User(Base):
    __tablename__ = "users"

    username = Column(String, primary_key=True)
    password = Column(String)


class Lecture(Base):
    __tablename__ = "lectures"

    id = Column(Integer, primary_key=True, autoincrement=True)
    lecture_id = Column(String(255))
    username = Column(String(255), ForeignKey("users.username"))
    course_name = Column(String(255))
    course_code = Column(String(255), index=True)
    schedule = Column(String(255))
    instructor = Column(String(255))
    campus = Column(String(255))
    caution = Column(String(255))
    classroom = Column(String(255))
    grade = Column(String(255))
    major = Column(String(255))
    semester = Column(String(255))
    subject_type = Column(String(255))


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), ForeignKey("users.username"))
    is_chatbot = Column(Boolean)
    message = Column(Text(255))
    time = Column(DateTime, index=True)