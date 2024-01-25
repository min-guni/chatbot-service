from fastapi import APIRouter

from models.lecture import Lecture

router = APIRouter()


@router.get("/", response_model=list[Lecture])
def send_all_lecture():  # 전체 강의 조회
    lecture_list = []
    # lecture list에 담아서 넘기기
    return lecture_list


@router.get("/{id}", response_model=list[Lecture])
def send_saved_lecture():  # 전체 강의 조회
    lecture_list = []
    # lecture list에 담아서 넘기기
    return {"lecture" : lecture_list}


@router.post("/", response_model=list[Lecture])
def search_lecture(query):  # 강의 검색
    lecture_list = []
    return {"lecture" : lecture_list}
