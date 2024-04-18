from bs4 import BeautifulSoup
import requests
import json

def getInt(x):
    num_dict = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'six': 6,
    }
    return num_dict.get(x)

url = 'https://www.cics.umass.edu/ugrad-education/courses'
response = requests.get(url)
content = response.content
soup = BeautifulSoup(content, 'html.parser')

# Example selectors based on a possible new page structure
course_elements = soup.find_all('div', class_='course-block')  # Assuming each course is in a 'div' with class 'course-block'

courses = []
for course in course_elements:
    code = course.find('span', class_='course-code').get_text().strip()
    name = course.find('span', class_='course-name').get_text().strip()
    description = course.find('p', class_='course-description').get_text().strip()

    instructor_info = course.find('span', class_='course-instructor')
    instructors = instructor_info.get_text().strip() if instructor_info else 'Not listed'

    prereq_element = course.find('div', class_='course-prerequisites')
    prerequisites = prereq_element.get_text().strip() if prereq_element else 'None'

    # Example of how you might parse the credit information
    credit_text = course.find('span', class_='course-credits').get_text()
    credits = getInt(credit_text) if credit_text.isalpha() else int(credit_text)

    course_data = {
        'code': code,
        'name': name,
        'credits': credits,
        'instructors': instructors,
        'description': description,
        'prerequisites': prerequisites
    }
    courses.append(course_data)

with open('course_data.json', 'w+') as f:
    json.dump({'courses': courses}, f, indent=4)
