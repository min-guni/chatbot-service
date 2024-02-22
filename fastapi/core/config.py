import secrets
from typing import Optional, Dict, Any

from pydantic import field_validator
from pydantic.v1 import BaseSettings
import pymysql


class Settings(BaseSettings):
    SECRET_KEY: str = "jwht8drekWiHLV7ob4BidRy6KQZAN16V13koyJrhgZ4"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    SERVER_NAME: str = "test"
    SERVER_HOST: str = "http://localhost:8000/"
    PROJECT_NAME: str = "test"
    DB_USERNAME: str = 'admin'
    DB_PWD: str = 'dlrhdwm20'
    DB_NAME: str = 'users'
    SQLALCHEMY_DATABASE_URI: str = "ysu-team-003-rds.cnmgd1eiu1rn.ap-northeast-2.rds.amazonaws.com"
    ELASTIC_CID = 'https://ysu-001.es.us-east-2.aws.elastic-cloud.com'
    ELASTIC_CU = "elastic"
    ELASTIC_PU = "0tNWkVNJToMYRyZxdlEE636S"
    OPEN_AI_KEY = "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"
    FILE_ID = "file-23uEmh0gElMlY0JJWMjjv1FU"
    FINE_TUNED_MODEL = "ft:gpt-3.5-turbo-0613:personal::8pvSm5cb"
    JOB_ID = "ftjob-Zd4SUqjBtxhb8tDHWOSXUSzZ"



settings = Settings()
