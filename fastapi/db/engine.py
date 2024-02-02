from sqlmodel import create_engine

from core.config import settings

engine = create_engine(
    f"mysql+pymysql://{settings.DB_USERNAME}:{settings.DB_PWD}@{settings.SQLALCHEMY_DATABASE_URI}/{settings.DB_NAME}")
