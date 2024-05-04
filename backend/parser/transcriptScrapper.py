from PyPDF2 import PdfReader
import os
import json

def parse_transcript(file_path):
    if not file_path:
        return []
    
    reader = PdfReader(file_path)

    prefix = ['COMPSCI', 'MATH', 'INFO', 'STATISTIC', 'RES-ECON', 'ENGLWRIT', 'SOCIOL', 'CICS']

    courses = []
    major = []
    minor = []
    gpa = 0
    credits = 0

    for page in reader.pages:
        text = page.extract_text()
        lines = text.split('\n')
        for line in lines:
            if any(course in line for course in prefix):
                line_split = line.split(' ')
                code = ''.join(line_split[:3])
                courses.append(code)
            if 'Major' in line:
                major_info = line.split(':')[1:]
                for info in major_info:
                    if info.strip() not in major:
                        major.append(info.strip())
            if 'Minor' in line:
                minor_info = line.split(':')[1:]
                for info in minor_info:
                    if info.strip() not in minor:
                        minor.append(info.strip())
            if 'Combined' in line:
                gpa_credits_info = line.split('Combined')
                gpa = gpa_credits_info[1].split(':')[1].strip()
                credits = gpa_credits_info[2].split()[2].strip()
        
    return major, minor, courses, gpa, credits

def store_result(major, minor, courses, gpa, credits):
    if not courses:
        return
    
    filename = 'transcript.json'
    folder_path = './parser'
    file_path = os.path.join(folder_path, filename)

    with open(file_path, 'w', encoding='utf-8') as f:
        data = {'majors': major,
                'minors': minor,
                'courses': courses,
                'gpa': gpa,
                'credits': credits}
        json.dump(data, f)

def main():
    major, minor, courses, gpa, credits = parse_transcript(None)
    store_result(major, minor, courses, gpa, credits)
    exit()

main()