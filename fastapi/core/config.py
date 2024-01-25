import secrets

from pydantic.v1 import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    SERVER_NAME: str = "test"
    SERVER_HOST: str = "http://localhost:8000/"
    PROJECT_NAME: str = "test"


settings = Settings()
