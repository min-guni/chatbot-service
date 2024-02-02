import secrets
from typing import Optional, Dict, Any

from pydantic import field_validator
from pydantic.v1 import BaseSettings
import pymysql


class Settings(BaseSettings):
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    SERVER_NAME: str = "test"
    SERVER_HOST: str = "http://localhost:8000/"
    PROJECT_NAME: str = "test"
    DB_USERNAME: str = 'admin'
    DB_PWD: str = 'dlrhdwm!'
    DB_NAME: str = 'user'
    SQLALCHEMY_DATABASE_URI: str = "ysu-team-003-rds.cnmgd1eiu1rn.ap-northeast-2.rds.amazonaws.com"



settings = Settings()
