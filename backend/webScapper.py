from bs4 import BeautifulSoup
import requests
import pprint

url = 'https://www.cics.umass.edu/content/fall-24-course-descriptions'
response = requests.get(url)
content = response.content
soup = BeautifulSoup(content, 'html.parser')

# Getting course titles from h2 with anchor with id in it
courseTitles = [h2.a.get_text() for h2 in soup.find_all('h2') if h2.a]
courseDescriptions = [p.get_text() for p in soup.find_all('p') if not p.find('a')]
coursePrerequisite = []
courseCredits = []

for i in range(len(courseDescriptions) - 1):
    info = courseDescriptions[i].split(':')[-1]
    if 'Prerequisite' in courseDescriptions[i]:
        for i in range(len(info) - 2, -1, -1):
            if info[i] == '.':
                prerequisite = info[:i].strip()
                credit = info[i + 1:].strip()
                break
        coursePrerequisite.append(prerequisite)
        courseCredits.append(credit)
    else:
        
        for i in range(len(info) - 2, -1, -1):
            if info[i] in '23456789':
                credit = info[i : i + 9]
                break
            elif info[i] == '1':
                credit = info[i : i + 8]
                break
        coursePrerequisite.append(None)
        courseCredits.append(credit)

with open('course.txt', 'w', encoding='utf-8') as f:
    for i in range(len(courseTitles)):
        f.write('Course Title: %s\nPrerequisite: %s\nCredits: %s\n\n' %(courseTitles[i], coursePrerequisite[i], courseCredits[i]))