#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import emoji
import telegram
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from datetime import datetime
import time
from bs4 import BeautifulSoup
import random

ID = ''
PW = ''
driver = webdriver.Chrome()
driver.get('https://everytime.kr/login')
driver.find_element(By.NAME, 'id').send_keys(ID)
driver.find_element(By.NAME, 'password').send_keys(PW)
driver.find_element(By.XPATH, '//input[@value="에브리타임 로그인"]').click()


# In[19]:


everytime_url=[]


# In[32]:


for i in range(400,448):
    driver.get('https://everytime.kr/442356/p/'+str(i+1))
    time.sleep(3)
    time.sleep(random.uniform(1,5))
    
    html = driver.page_source

    soup = BeautifulSoup(html, 'html.parser')

    articles = soup.find_all('article', class_='list')

    for article in articles:
        a_tag = article.find('a', class_='article')
        if a_tag and 'href' in a_tag.attrs:
            href_value = a_tag['href']
            everytime_url.append('everytime.kr'+href_value)


# In[33]:


len(everytime_url)


# In[38]:


import json

file_path="url.json"
with open(file_path, 'w') as json_file:
    json.dump(everytime_url, json_file, indent=2)


# In[ ]:




