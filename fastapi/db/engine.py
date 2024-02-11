from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlmodel import create_engine
from elasticsearch import Elasticsearch

from core.config import settings

engine = create_engine(
    f"mysql+pymysql://{settings.DB_USERNAME}:{settings.DB_PWD}@{settings.SQLALCHEMY_DATABASE_URI}/{settings.DB_NAME}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

es = Elasticsearch([settings.ELASTIC_CID],basic_auth=(settings.ELASTIC_CU, settings.ELASTIC_PU))