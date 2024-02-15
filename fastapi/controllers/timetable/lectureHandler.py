from fastapi import APIRouter, Query
from typing import Union, Dict, Annotated

from db.engine import es
from models.lecture import Lecture

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
def search_lecture_english(q: str):  # 강의 탐색
    query = { 
        "bool" : {
            "must": 
            [ 
            {
                "match" : {
                    "caution" : "영어강의"
                }
            },
            
            {
                "multi_match" : {
                    "query":    query_text, 
                    "fields": [ "course_name^2", "course_name.course_keyword^2", "course_name.course_english", "course_desc", "course_desc.desc_english" ,"schedule", "instructor"] 
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
        "bool" : {
            
            "must": 
            [{
                "multi_match" : {
                    "query":    query_text, 
                    "fields": [ "course_name^2", "course_name.course_keyword^2", "course_name.course_english", "course_desc", "course_desc.desc_english" ,"schedule", "instructor"] 
            }
            }],
            "must_not" : [{
                "match" : {
                    "caution" : " 대면강의"
                },
                "match" : {
                    "caution" : "대면강의"
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
        "bool" : {
            "must": 
            [
            {
                "multi_match" : {
                    "query":    query_text, 
                    "fields": [ "course_name^2", "course_name.course_keyword^2", "course_name.course_english", "course_desc", "course_desc.desc_english" ,"schedule", "instructor"] 
            }
            }
            ],
            "must_not":
            [
                {
                    "match" : {
                    "caution" : "영어강의"
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

@router.get("/detail/{id}")
def get_detail(id: str):
    query = {
        "term": {
            "id": {
                "value": id #아이디가 아니라 학정번호로 찾을 수 있는 코드를 짜줘야됨..
            }
        }
    }
    index = "course_final"
    fields = ["course_name", "course_desc", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "url", "subject_type", "reviews"]

    resp = es.search(index=index, query=query, fields=fields, source=False)
    print(resp)
    return {"lecture": resp}


@router.get("/{id}", response_model=list[Lecture])
def get_saved_lecture(id: str):
    # 현재 current user와 id 가 일치하는지 확인
    # 저장된 강의 리스트 return
    return []


@router.post("/{id}")
def save_lecture(id: str):  # 사용자 강의 저장
    # 현재 curretn user와 id가 일치하는지 확인
    return []
