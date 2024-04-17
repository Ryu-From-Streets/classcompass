from bs4 import BeautifulSoup
import requests
import pprint
import json

url = 'https://www.cics.umass.edu/content/fall-24-course-descriptions'
response = requests.get(url)
content = response.content
soup = BeautifulSoup(content, 'html.parser')

# Getting course titles from h2 with anchor with id in it
courseHeader = [h2.a.get_text() for h2 in soup.find_all('h2') if h2.a]
courseInstructors = [h3.get_text().split(':')[1].lstrip() for h3 in soup.find_all('h3')]
courseBody = [p.get_text() for p in soup.find_all('p') if not p.find('a')]

code = []
name = []
credits = []
instructors = []
description = []
prerequisites = []
offset = 0

for i in range(len(courseHeader)):
    header = courseHeader[i].split(':')
    code.append(header[0])
    name.append(header[1].strip())

    description.append(courseBody[i])

    if header[0] in ['COMPSCI 701', 'COMPSCI 701Y']:
        instructors.append('None')
        offset += 1
    else:
        instructors.append(courseInstructors[i - offset])
    
    body_split = courseBody[i].split()
    prereq_start = False
    credit = []
    prereq_content = []

    for n in range(len(body_split)):
        if 'Prerequisite' in body_split[n] or 'Prerequisites' in body_split[n]:
            prereq_start = True
            continue
        
        if prereq_start:
            if body_split[n] not in '123456789':
                prereq_content.append(body_split[n])
            else:
                prereq_start = False
        
        if 'credit' in body_split[n] or 'credits' in body_split[n]:
            credit.append(body_split[n - 1].strip('('))
    
    prerequisites.append(' '.join(prereq_content).strip().strip('.') if prereq_content else 'None')
    credits.append(list(set(credit)))

courses = []
for i in range(len(code)):
    course = {
        'code': code[i],
        'name': name[i],
        'credits': credits[i],
        'instructors': instructors[i],
        'description': description[i],
        'prerequisites': prerequisites[i]
    }
    courses.append(course)

with open('course.json', 'w') as f:
    data = {'courses': courses}
    json.dump(data, f)