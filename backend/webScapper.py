from bs4 import BeautifulSoup
import requests

url = 'https://www.cics.umass.edu/content/fall-24-course-descriptions'
response = requests.get(url)
content = response.content

soup = BeautifulSoup(content, 'html.parser')


with open('course.txt', 'w', encoding='utf-8') as f:
    f.write('%s\n' %soup)