from PyPDF2 import PdfReader
import os
import json

def parse_transcript(file_path):
    if not file_path:
        return []
    
    reader = PdfReader(file_path)

    prefix = ['COMPSCI', 'MATH', 'INFO', 'STATISTIC', 'RES-ECON', 'ENGLWRIT', 'SOCIOL', 'CICS']
    courses = []

    for page in reader.pages:
        text = page.extract_text()
        lines = text.split('\n')
        for line in lines:
            if any(course in line for course in prefix):
                line_split = line.split(' ')
                code = ''.join(line_split[:3])
                courses.append(code)
    
    return courses

def store_result(courses):
    if not courses:
        return
    
    filename = 'transcript.json'
    folder_path = '../backend/parser'
    file_path = os.path.join(folder_path, filename)

    with open(file_path, 'w', encoding='utf-8') as f:
        data = {'courses': courses}
        json.dump(data, f)

def main():
    courses = parse_transcript(None)
    store_result(courses)
    exit()

main()