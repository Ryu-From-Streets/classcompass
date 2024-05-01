from bs4 import BeautifulSoup
import requests
import json
import os

class Scrapper:

    def __init__(self) -> None:
        url = 'https://www.cics.umass.edu/content/fall-24-course-descriptions'
        content = self.get_response(url)
        web_scrapping = self.scrapping(BeautifulSoup(content, 'html.parser'))
        self.store_content(web_scrapping)

    def getInt(self, x):
        num_dict = {
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'six': 6,
        }
        return num_dict.get(x)

    def get_response(self, url):
        response = requests.get(url)
        return response.content
    
    def scrapping(self, soup):
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
            if header[0].replace(' ', '') in code:
                continue
            code.append(header[0].replace(' ', ''))
            name.append(header[1].strip())

            # description.append(courseBody[i])

            if header[0] in ['COMPSCI 701', 'COMPSCI 701Y']:
                instructors.append('None')
                offset += 1
            else:
                people = courseInstructors[i - offset].split(',')
                staff = False
                for n in range(len(people)):
                    if 'STAFF' in people[n]:
                        staff = True
                    people[n] = people[n].strip()
                if staff:
                    instructors.append(people[:-1])
                else:
                    instructors.append(people)
            
            body_split = courseBody[i].split()
            prereq_start = False
            credit = []
            prereq_content = []
            body_index = -1

            for n in range(len(body_split)):
                if 'Prerequisite' in body_split[n] or 'Prerequisites' in body_split[n]:
                    prereq_start = True
                    body_index = n
                    continue
                
                if prereq_start:
                    if body_split[n] not in '123456789':
                        prereq_content.append(body_split[n])
                    else:
                        prereq_start = False

                if 'credit' in body_split[n] or 'credits' in body_split[n]:
                    if body_split[n - 1].strip('(') in '123456789':
                        credit.append(int(body_split[n - 1].strip('(')))
                    elif body_split[n - 1].strip('(') in ['one', 'two', 'three', 'four', 'six']:
                        credit.append(self.getInt(body_split[n - 1].strip('(')))
            
            if body_index == -1:
                description.append(' '.join(body_split))
            else:
                description.append(' '.join(body_split[:body_index]))
            
            prerequisites.append(' '.join(prereq_content).strip().strip('.') if prereq_content else 'None')

            if header[0] in ['COMPSCI 701', 'COMPSCI 701Y']:
                credits.append(6)
            elif header[0] == 'COMPSCI 240':
                credits.append(4)
            else:
                credits.extend(list(set(credit)))

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

        return courses
    
    def store_content(self, courses):
        filename = 'course.json'
        folder_path = './backend/parser'
        file_path = os.path.join(folder_path, filename)

        with open(file_path, 'w', encoding='utf-8') as f:
            data = {'courses': courses}
            json.dump(data, f)

def main():
    Scrapper()
    exit()

main()