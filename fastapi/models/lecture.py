
from pydantic import BaseModel


class Lecture(BaseModel):
    lecture_name : str
    professor : str
    class_id : int
    time : dict
    major : str
