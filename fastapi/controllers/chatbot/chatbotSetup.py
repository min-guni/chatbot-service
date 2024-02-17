from sentence_transformers import SentenceTransformer
from elasticsearch import Elasticsearch
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPEN_AI_KEY=os.getenv("OPEN_AI_KEY")
FILE_ID=os.getenv("FILE_ID")
FINE_TUNED_MODEL=os.getenv("FINE_TUNED_MODEL")
JOB_ID=os.getenv("JOB_ID")

ES_CLOUD_ID=os.getenv("ES_CLOUD_ID")
ES_USER=os.getenv("ES_USER")
ES_PWD=os.getenv("ES_PWD")

# Elasticsearch 클라이언트 인스턴스 생성, basic_auth 사용
es_client = Elasticsearch(
    cloud_id=ES_CLOUD_ID,
    basic_auth=(ES_USER, ES_PWD),
    timeout=10
)

openAI_client = OpenAI(
    api_key=OPEN_AI_KEY
)

setenceTransform_model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')
chatGPT_model = FINE_TUNED_MODEL
index_name = "elastictest_vector_final"

def top_n_similarity(query):
    query_embedding = setenceTransform_model.encode(query).tolist()

    query_body = {
        "size": 10,
        "query": {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": """
                    double titleScore = cosineSimilarity(params.query_vector, 'title_embedding') + 1.0;
                    double detailScore = cosineSimilarity(params.query_vector, 'detail_embedding') + 1.0;
                    return titleScore + detailScore;
                    """,
                    "params": {
                        "query_vector": query_embedding
                    }
                }
            }
        }
    }

    es_response = es_client.search(index=index_name, body=query_body)

    return es_response

def create_gpt_prompt(es_response):
    prompt = "당신은 연세대학교 에브리타임 컴퓨터과학과 게시판 도우미 챗봇입니다. 주어진 관련된 정보로 학생의 질문에 자세히 답변해주세요. 다음은 학생의 질문과 관련된 문서의 제목과 내용입니다:\n\n"
    for hit in es_response['hits']['hits'][:5]:  # 상위 5개 문서만 사용
        title = hit['_source'].get('title', '')
        detail = hit['_source'].get('detail', '')
        comments = hit['_source'].get('comments', [])
        prompt += f"제목: {title}\n내용: {detail}\n\n"
        #prompt += "댓글:\n"
        for comment in comments:
            prompt += f"{comment['Comment']}\n"
        prompt += "\n"
    prompt += "이 정보를 바탕으로 학생의 질문에 답변해주세요: "
    print(prompt)
    return prompt

# OpenAI GPT 챗봇 호출
def call_gpt(es_response, query):
    prompt = create_gpt_prompt(es_response) + query
    try:
        gpt_response = openAI_client.chat.completions.create(
            model="gpt-3.5-turbo",#model=FINE_TUNED_MODEL, 
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": query}
            ],
            max_tokens=3000,
            temperature=0.7
        )
        return gpt_response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI GPT 호출 중 오류 발생: {e}")
        return None


def rag(query):
    es_response = top_n_similarity(query)
    return call_gpt(es_response, query)


