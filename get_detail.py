#!/usr/bin/env python
# coding: utf-8

# In[24]:


import json
import emoji
import telegram
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from datetime import datetime
import time
from bs4 import BeautifulSoup
import random
from html import unescape


# In[25]:


ID = ''
PW = ''
driver = webdriver.Chrome()
driver.get('https://everytime.kr/login')
driver.find_element(By.NAME, 'id').send_keys(ID)
driver.find_element(By.NAME, 'password').send_keys(PW)
driver.find_element(By.XPATH, '//input[@value="에브리타임 로그인"]').click()


# In[26]:


def extract_text(tags):
    full_text = ""
    for tag in tags:
        # 태그에서 텍스트 추출
        text = tag.get_text()

        # HTML 엔티티를 일반 텍스트로 변환 (예: &amp; -> &)
        text = unescape(text)  # 이 부분에서 오류가 발생했습니다.

        # 공백 제거 및 정리
        text = text.strip()

        # 텍스트 추가
        full_text += text + " "  # 단어 사이에 공백 추가

    return full_text.strip()  # 마지막 공백 제거


# In[27]:


def extract_comments(soup):
    comments = []
    last_parent_author = None

    for article in soup.find_all('article'):
        comment_type = None  # 여기에 초기값 설정
        author = ""
        comment_text = ""
        timestamp = ""
        vote_count = 0

        h3_tag = article.find('h3', class_='medium')
        p_tag = article.find('p', class_='large')
        time_tag = article.find('time', class_='medium')
        vote_tag = article.find('li', class_='vote')

        if h3_tag:
            author = h3_tag.text.strip()
        if p_tag:
            comment_text = p_tag.text.strip()
        if time_tag:
            timestamp = time_tag.text.strip()
        if vote_tag:
            vote_count = vote_tag.text.strip()

        if 'parent' in article['class']:
            last_parent_author = author
            comment_type = 'parent'
        elif 'child' in article['class']:
            comment_type = 'child'

        if comment_type:
            comment_dict = {
                "Type": comment_type,
                "Author": author,
                "Comment": comment_text,
                "Timestamp": timestamp,
                "Vote Count": vote_count
            }

            # 대댓글일 경우 부모 댓글의 작성자 추가
            if comment_type == 'child' and last_parent_author:
                comment_dict["Parent Author"] = last_parent_author

            comments.append(comment_dict)

    return comments


# In[34]:


result_dict = {
    "title": [],
    "detail": [],
    "likes": [],
    "comments_count": [],
    "scraps": [],
    "comments": [],
    "url": [],
    "timestamp": []
}


# In[35]:


file_path = "url_test.json"
test = []
with open(file_path, 'r', encoding='UTF-8') as json_file:
    data = json.load(json_file)

for url in data:
    driver.get("https://" + url)
    time.sleep(3 + random.uniform(1, 5))
    html_content = driver.page_source
    soup = BeautifulSoup(html_content, 'html.parser')
    
    title = extract_text(soup.find_all('h2', class_='large'))
    detail = extract_text(soup.find('p', class_='large'))
    likes = extract_text(soup.find('li', class_= "vote"))
    comments_count = extract_text(soup.find('li', class_="comment"))
    scraps = extract_text(soup.find('li', class_='scrap'))
    comments = extract_comments(soup)
    timestamp = extract_text(soup.find('time', class_='large'))

    result_dict["title"].append(title)
    result_dict["detail"].append(detail)
    result_dict["likes"].append(likes)
    result_dict["comments_count"].append(comments_count)
    result_dict["scraps"].append(scraps)
    result_dict["url"].append(url)
    result_dict["comments"].append(comments)
    result_dict["timestamp"].append(timestamp)
    


# In[33]:


file_path="everytime_computer_data.json"
with open(file_path, 'w', encoding='UTF-8') as json_file:
    json.dump(result_dict, json_file, indent=2, ensure_ascii=False)


# In[ ]:





# In[ ]:




