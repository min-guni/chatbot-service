from sqlmodel import create_engine
from elasticsearch import Elasticsearch

from core.config import settings

engine = create_engine(
    f"mysql+pymysql://{settings.DB_USERNAME}:{settings.DB_PWD}@{settings.SQLALCHEMY_DATABASE_URI}/{settings.DB_NAME}")
es = Elasticsearch([settings.ELASTIC_CID],basic_auth=(settings.ELASTIC_CU, settings.ELASTIC_PU))