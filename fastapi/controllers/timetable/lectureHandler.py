from fastapi import APIRouter, Query
from typing import Union, Dict, Annotated

from db.crud_lecture import get_by_id
from db.engine import es
from models.lecture import Lecture

from core.security import CurrentUser, SessionDep

from db.crud_lecture import save

from db.crud_lecture import delete

router = APIRouter()


@router.get("/", response_model=list[Lecture])
def search_lecture(q: str):  # 강의 탐색

    query = {
        "multi_match": {
            "query": q,
            "fields": ["course_name", "course_name.course_keyword^2", "course_name.course_english", "course_desc",
                       "course_desc.desc_english", "schedule", "instructor"]
        }
    }
    fields = ["id", "course_name", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "subject_type"]
    index = 'course_final'
    # query parameter
    resp = es.search(index=index,
                     query=query,
                     fields=fields,
                     size=10,
                     source=False)

    tops = resp['hits']['hits'][:10]

    lecture_list = [{key: value[0] for key, value in d["fields"].items()} for d in tops]
    return lecture_list


@router.post("/")
def save_lecture(lecture: Lecture, session: SessionDep, current_user: CurrentUser):  # 사용자 강의 저장
    save(session, current_user.username, lecture)
    print(lecture)
    return "save complete"


@router.get("/detail/{id}")
def get_detail(id: str):
        query = {
        "term" : {
            "_id": {
                "value" : id
            }
        }
    }
    index = "course_final"
    fields = ["course_name", "course_desc", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "url", "subject_type", "reviews"]
    resp = es.search(index=index, query=query, fields = fields, source=False)['hits']['hits'][0]
    # print(resp['fields']['reviews'])
    # reviews = resp['fields']['reviews'][0].replace("'", '"')
    # reviews_json = json.loads(reviews)
    # print(reviews_json)

    # reviews_json = json.loads(reviews)
    # review_text --->>> reviews_json[0]["review_text"]
    return {"lecture": resp}


@router.get("/me", response_model=list[Lecture])
def get_saved_lecture(session: SessionDep, current_user: CurrentUser):
    lecture_list = get_by_id(session, username=current_user.username)
    obj_out = [Lecture(id=obj_in.lecture_id, course_name=obj_in.course_name, course_code=obj_in.course_code,
                       subject_type=obj_in.subject_type,
                       campus=obj_in.campus, caution=obj_in.caution, classroom=obj_in.classroom,
                       semester=obj_in.semester,
                       grade=obj_in.grade, major=obj_in.major, instructor=obj_in.instructor,
                       schedule=obj_in.schedule) for obj_in in lecture_list]
    print(lecture_list)
    print(obj_out)
    return obj_out

@router.delete("/{id}", response_model=str)
def delete_lecture(session: SessionDep, current_user : CurrentUser, id : str):
    delete(session,current_user.username,id)
    return "deleted"


def search_lecture_english(q: str):  # 강의 탐색
    query = {
        "bool": {
            "must":
                [
                    {
                        "match": {
                            "caution": "영어강의"
                        }
                    },

                    {
                        "multi_match": {
                            "query": query_text,
                            "fields": ["course_name^2", "course_name.course_keyword^2", "course_name.course_english",
                                       "course_desc", "course_desc.desc_english", "schedule", "instructor"]
                        }
                    }
                ]
        }
    }
    fields = ["course_name", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "subject_type"]
    index = 'course_final'
    # query parameter
    resp = es.search(index=index,
                     query=query,
                     fields=fields,
                     size=10,
                     source=False)

    tops = resp['hits']['hits'][:10]

    lecture_list = [{key: value[0] for key, value in d["fields"].items()} for d in tops]
    print(lecture_list)
    # lecture list에 담아서 넘기기
    return lecture_list


def search_lecture_video_blended(q: str):  # 강의 탐색
    query = {
        "bool": {

            "must":
                [{
                    "multi_match": {
                        "query": query_text,
                        "fields": ["course_name^2", "course_name.course_keyword^2", "course_name.course_english",
                                   "course_desc", "course_desc.desc_english", "schedule", "instructor"]
                    }
                }],
            "must_not": [{
                "match": {
                    "caution": " 대면강의"
                },
                "match": {
                    "caution": "대면강의"
                }
            }]

        }
    }
    fields = ["course_name", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "subject_type"]
    index = 'course_final'
    # query parameter
    resp = es.search(index=index,
                     query=query,
                     fields=fields,
                     size=10,
                     source=False)

    tops = resp['hits']['hits'][:10]

    lecture_list = [{key: value[0] for key, value in d["fields"].items()} for d in tops]
    print(lecture_list)
    # lecture list에 담아서 넘기기
    return lecture_list


def search_lecture_korean(q: str):  # 강의 탐색
    query = {
        "bool": {
            "must":
                [
                    {
                        "multi_match": {
                            "query": query_text,
                            "fields": ["course_name^2", "course_name.course_keyword^2", "course_name.course_english",
                                       "course_desc", "course_desc.desc_english", "schedule", "instructor"]
                        }
                    }
                ],
            "must_not":
                [
                    {
                        "match": {
                            "caution": "영어강의"
                        }
                    }
                ]
        }
    }
    fields = ["course_name", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "subject_type"]
    index = 'course_final'
    # query parameter
    resp = es.search(index=index,
                     query=query,
                     fields=fields,
                     size=10,
                     source=False)

    tops = resp['hits']['hits'][:10]

    lecture_list = [{key: value[0] for key, value in d["fields"].items()} for d in tops]
    print(lecture_list)
    # lecture list에 담아서 넘기기
    return lecture_list
