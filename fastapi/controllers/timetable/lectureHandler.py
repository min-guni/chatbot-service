from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def send_all_lecture() -> list:  # 전체 강의 조회
    lecture_list = []
    # lecture list에 담아서 넘기기
    return lecture_list


@router.get("/{id}")
def send_saved_lecture() -> list:  # 전체 강의 조회
    lecture_list = []
    # lecture list에 담아서 넘기기
    return lecture_list


@router.post("/")
def search_lecture(query) -> list:  # 강의 검색
    lecture_list = []
    return lecture_list
