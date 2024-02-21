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
def search_lecture(query: str, major: str = '', search_type: str = 'default', result_type: str = ''):  # 강의 탐색
    print(query,major,search_type,result_type)
    total_query = {
        "bool": {
            "must": [],
            "must_not": []

        }
    }
    if major != "":
        must_major_query = {
            "match": {
                "major.major_keyword": major
            }
        }
        total_query['bool']["must"].append(must_major_query)

    fields = []
    if search_type == "default":
        # 강의명
        fields = ["course_name^3", "course_name.course_keyword^3", "course_name.course_english", "course_desc",
                  "course_desc.desc_english"]
    elif search_type == "professor":
        # 교수님
        fields = ["instructor", "instructor.text"]
    search_way_query = {
        "multi_match": {
            "query": query,
            "fields": fields
        }
    }
    if fields != []:
        total_query['bool']["must"].append(search_way_query)
    # must_not
    video_blended = [
        {"term": {
            "caution": " 대면강의"
        }},
        {"term": {
            "caution": "대면강의"
        }}
    ]
    # must
    english = [{
        "terms": {
            "caution": ["영어강의", " 영어강의"]
        }}
    ]
    if "english" in result_type:
        total_query['bool']["must"] += english
    elif "korean" in result_type:
        total_query['bool']["must_not"] += english
    if "video_blended" in result_type:
        total_query['bool']["must_not"] += video_blended
    if total_query['bool']['must'] == []:
        del total_query['bool']['must']
    if total_query['bool']['must_not'] == []:
        del total_query['bool']['must_not']
    index = 'course_final'
    fields = ["course_name", "course_desc", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "id", "subject_type"]
    body = {"query": total_query, "_source": fields, "size": 20}
    courses = es.search(body=body, index=index)['hits']['hits']

    # resp = es.search(index = index, fields=fields,body = body, size=10,min_score=3,  source=False)
    print(total_query)
    print("\n\n")
    resp = [course['_source'] for course in courses]
    return resp



@router.post("/")
def save_lecture(lecture: Lecture, session: SessionDep, current_user: CurrentUser):  # 사용자 강의 저장
    save(session, current_user.username, lecture)
    print(lecture)
    return "save complete"


@router.get("/detail/{id}")
def get_detail(id: str):
    course_query = {
        "term": {
            "id": {
                "value": id
            }
        }
    }
    course_index = "course_final"
    course_fields = ["course_name", "course_desc", "course_code", "schedule", "instructor", "campus", "caution",
                     "classroom",
                     "grade", "major", "semester", "url", "subject_type"]
    course_resp = es.search(index=course_index, query=course_query, fields=course_fields, source=False)['hits']['hits'][
        0]
    # print(course_resp)
    review_query = {

        "match": {
            "id": id
        }

    }

    review_index = "reviews_sentiment"
    review_fields = ["posvote", "review_semester", "star", "course_name", "review_text", "ml.inference.predicted_value",
                     "ml.inference.prediction_probability"]
    # review_resp 이 review 다 들어있는 array.
    review_resp = es.search(index=review_index, query=review_query, fields=review_fields, source=False)['hits']['hits']
    # review_resp => reviews 들어있는 array, dictionary로 값 불러올 수 잇음.
    # print(review_resp[0]['fields']["ml.inference.predicted_value"]) 이런 식으로 값 처리 가능.
    course = course_resp.get("fields")
    reviews = []
    pros_num = 0;
    cons_num = 0;
    star_avg = 0;
    for review in review_resp:
        review_info = review.get("fields")
        reviews.append({'pros': int(review_info.get("ml.inference.prediction_probability")[0] * 100),
                        'star': review_info.get("star")[0], 'review_text': review_info.get("review_text")[0],
                        'review_semester': review_info.get('review_semester')[0],
                        'is_positive': review_info.get("ml.inference.predicted_value")[0]})
        star_avg += review_info.get("star")[0]
        if review_info.get("ml.inference.predicted_value")[0] == "positive":
            pros_num += 1
        else:
            cons_num += 1
    course["reviews"] = reviews
    course["pros"] = pros_num
    course["cons"] = cons_num
    course["star_avg"] = round(star_avg / (pros_num + cons_num), 2)
    return course


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
def delete_lecture(session: SessionDep, current_user: CurrentUser, id: str):
    delete(session, current_user.username, id)
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
