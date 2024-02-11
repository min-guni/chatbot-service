from typing import Union

from sqlalchemy import Boolean, Column, ForeignKey, String
from sqlalchemy.orm import relationship

from db.engine import Base


# Shared properties
class User(Base):
    __tablename__ = "users"

    username = Column(String, primary_key=True)
    password = Column(String)