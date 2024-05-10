
from pydantic import BaseModel


class Lecture(BaseModel):
    id : str
    course_name : str
    course_code : str
    subject_type : str
    campus : str
    caution : str
    classroom : str
    semester : str
    grade : str
    major : str
    instructor : str
    schedule : str

# class LectureDetail(Lecture):
