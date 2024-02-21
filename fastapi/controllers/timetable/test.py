# -*- coding: utf-8 -*-
from elasticsearch import Elasticsearch
cid = 'https://ysu-001.es.us-east-2.aws.elastic-cloud.com'
cu = "elastic"
cp = "0tNWkVNJToMYRyZxdlEE636S"

def es_connect(cid, user, passwd):
    es = Elasticsearch([cid],basic_auth=(user, passwd))
    return es
def total_search(query_dict, es):


    total_query = {
        "bool" : {
            "must": [],
            "must_not" : []
        }
    }
    # 특정 전공의 과목 혹은 교양을 을 보여드릴까요?
    #    전공명
    course_type_list = ['교양기초(2019학번~) 채플', '교양기초(2019학번~) 기독교의이해', '교양기초(2019학번~) 글쓰기', '대학교양(2019학번~) 문학과예술', '대학교양(2019학번~) 인간과역사', '대학교양(2019학번~) 언어와표현', '대학교양(2019학번~) 가치와윤리', '대학교양(2019학번~) 국가와사회', '대학교양(2019학번~) 지역과세계', '대학교양(2019학번~) 논리와수리', '대학교양(2019학번~) 자연과우주', '대학교양(2019학번~) 생명과환경', '대학교양(2019학번~) 정보와기술', '대학교양(2019학번~) 체육과건강', '자율선택(2019학번~) 자율선택', 'RC교육(2019학번~) 사회참여(SE)', 'RC교육(2019학번~) YONSEI RC101', 'RC교육(2019학번~) RC자기주도활동', 'RC교육(2019학번~) RC심화', '문과대학 문과대학 공통', '문과대학 국어국문학전공', '문과대학 중어중문학전공', '문과대학 영어영문학전공', '문과대학 독어독문학전공', '문과대학 불어불문학전공', '문과대학 노어노문학전공', '문과대학 사학전공', '문과대학 철학전공', '문과대학 문헌정보학전공', '문과대학 심리학전공', '상경대학 경제학전공', '상경대학 응용통계학전공', '경영대학 경영학전공', '이과대학 이과대학 공통', '이과대학 수학전공', '이과대학 물리학전공', '이과대학 화학전공', '이과대학 지구시스템과학전공', '이과대학 천문우주학전공', '이과대학 대기과학전공', '공과대학 공과대학공통', '공과대학 기계공학전공', '공과대학 전기전자공학전공', '공과대학 신소재공학전공', '공과대학 건설환경공학전공', '공과대학 도시공학전공', '공과대학 건축공학전공', '공과대학 건축학(설계)', '공과대학 화공생명공학전공', '공과대학 산업공학전공', '공과대학 시스템반도체공학과', '공과대학 디스플레이융합공학과', '생명시스템대학 시스템생물학전공', '생명시스템대학 생화학전공', '생명시스템대학 생명공학전공', '생명시스템대학 생명시스템공통', '인공지능융합대학 컴퓨터과학과', '인공지능융합대학 인공지능학과', '인공지능융합대학 IT융합공학과', '인공지능융합대학 인공지능융합대학공통', '신과대학 신학과', '사회과학대학 사회학전공', '사회과학대학 사회과학대학공통', '사회과학대학 정치외교학전공', '사회과학대학 행정학전공', '사회과학대학 언론홍보영상학부', '사회과학대학 사회복지학전공', '사회과학대학 문화인류학전공', '음악대학 음악대학공통', '음악대학 교회음악전공', '음악대학 성악전공', '음악대학 피아노전공', '음악대학 관현악전공', '음악대학 작곡전공', '교육과학대학 교육학전공', '교육과학대학 체육교육학전공', '교육과학대학 스포츠응용산업전공', '생활과학대학 의류환경학전공', '생활과학대학 식품영양학전공', '생활과학대학 실내건축학전공', '생활과학대학 아동·가족전공', '생활과학대학 통합디자인전공', '언더우드국제대학 공통교과과정(신촌)', '언더우드국제대학 언더우드학부(인문사회)-비교문학과문화', '언더우드국제대학 언더우드학부(인문사회)-국제학', '언더우드국제대학 언더우드학부(공학)-생명과학공학', '언더우드국제대학 언더우드학부(인문사회)-정치외교학', '언더우드국제대학 융합사회과학부-사회정의리더십', '언더우드국제대학 융합사회과학부-계량위험관리', '언더우드국제대학 융합사회과학부-과학기술정책', '언더우드국제대학 융합사회과학부-지속개발협력', '언더우드국제대학 융합과학공학부-나노과학공학', '언더우드국제대학 융합과학공학부-에너지환경융합', '언더우드국제대학 융합과학공학부-바이오융합', '언더우드국제대학 공통교과과정(국제)', '언더우드국제대학 테크노아트학부-정보·인터랙션디자인', '언더우드국제대학 아시아학부-아시아학', '언더우드국제대학 테크노아트학부-창의기술경영', '언더우드국제대학 테크노아트학부-문화디자인경영', '약학대학 약학전공', '글로벌인재대학 GLC공통교과과정', '글로벌인재대학 글로벌인재학부-국제통상전공', '글로벌인재대학 글로벌인재학부-한국문화전공', '글로벌인재대학 글로벌인재학부-한국언어문화교육전공', '글로벌인재대학 글로벌인재학부-문화미디어전공', '글로벌인재대학 글로벌인재학부-바이오생활공학전공', '글로벌인재대학 글로벌인재학부-응용정보공학전공', '글로벌인재대학 GLD공통교과과정', '의·치·간(1학년) 의예과(1학년)', '의·치·간(1학년) 치의예과(1학년)', '의·치·간(1학년) 간호(1학년)', '연계전공 유럽지역학', '연계전공 미국학', '연계전공 한국및동아시아학(중국학)', '연계전공 한국및동아시아학(한국학)', '연계전공 한국및동아시아학(일본학)', '연계전공 외교통상학', '연계전공 인지과학', '연계전공 벤처학', '연계전공 리더십', '연계전공 디지털예술학', '연계전공 한국및동아시아학(동아시아학)', '연계전공 비교문학', '연계전공 문화비평학', '연계전공 공공리더십', '교직과정 교직과정', '평생교육사과정 평생교육사과정', 'Study Abroad Course Graduate', 'Study Abroad Course Undergraduate', 'Study Abroad Course Korean Language', '공통 창업,현장실습', 'ROTC 군사학']
    # ex) 컴퓨터과학 or  지역과 세계 ~~
    """
    # 어떻게 검색을 도와드릴까요?
       강의명 + 강의설명 (default) / 교수명 / 시간 
       course_name + course_desc (default), professor, schedule
    """
    # 어떤 강의를 원하시나요?
    """
       토탈 / 영어-강의 /  동영상&blended 
       total / english / video&blended
    """
    if (query_dict["major"] != ""):
        must_major_query = {
            "match": {
                "major.major_keyword": major
            }
        }
        total_query['bool']["must"].append(must_major_query)


    fields = []
    if (query_dict["search_type"] == "default"):
        # 강의명
        fields = [ "course_name^3", "course_name.course_keyword^3", "course_name.course_english","course_desc", "course_desc.desc_english"]
    elif (query_dict["search_type"] == "professor"):
        # 교수님
        fields = [ "instructor"]
    elif (query_dict["search_type"] == "schedule"):
        #schedule
        fields = ["schedule"]



    search_way_query = {
        "multi_match" : {
            "query":   query_dict["query"],
            "fields" : fields
        }
    }
    if (fields != []):
        total_query['bool']["must"].append(search_way_query)
    #must_not
    video_blended = [
        {"match" : {
            "caution" : " 대면강의"
        }},
        {"match" : {
            "caution" : "대면강의"
        }}
    ]
    # must
    english = [{
        "match" : {
            "caution" : "영어강의"
        }},
        {
            "match" : {
                "caution" : " 영어강의"
            }
        }
    ]
    if ("english" in query_dict['result_type']):
        total_query['bool']["must"]+= english
    if ("video_blended" in query_dict['result_type']):
        total_query['bool']["must_not"] += video_blended


    index = 'course_final'
    fields = ["course_name", "course_desc", "course_code", "schedule", "instructor", "campus", "caution", "classroom",
              "grade", "major", "semester", "url", "subject_type"]

    resp = es.search(index = index, fields=fields,query = total_query, size=10,min_score=3,  source=False)
    print(total_query)
    print("\n")
    print(resp)
es = es_connect(cid, cu, cp)
while(True):
    major = input("Major: ")    # course_type_list 에 있는 요소로 똑같이!!! 혹은 빈 스트링 input에서는 그냥 엔터
    search_type = input("Search_Type: ")   # default (강의명+설명) / 교수명(professor) / 시간(schedule) / ""(그냥 엔터)
    result_type = input("Result_Type: ") # "english"  / "video_blended" / "" (그냥 엔터)
    query = input("User Query: ") # 유저 검색 값

    query_dict = {
        "major": major,
        "search_type": search_type,
        "result_type": result_type,
        "query": query
    }
    print(query_dict)
    print("\n")
    total_search(query_dict, es)