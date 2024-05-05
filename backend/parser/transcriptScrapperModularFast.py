import sys
import json
from PyPDF2 import PdfReader
import re
import logging

logging.basicConfig(level=logging.DEBUG)

class TranscriptParser:
    def __init__(self, file_path):
        self.file_path = file_path
        self.course_prefixes = [
            "COMPSCI", "MATH", "INFO", "STATISTIC", 
            "RES-ECON", "ENGLWRIT", "SOCIAL", "CICS"
        ]
        self.data = {
            "major": [],
            "minor": [],
            "courses": [],
            "gpa": None,
            "credits": None
        }

    def parse(self):
        try:
            reader = PdfReader(self.file_path)
        except Exception as e:
            logging.error(f"Failed to read PDF: {e}")
            return {}

        for page in reader.pages:
            self.process_page(page.extract_text())

        return self.data

    def process_page(self, text):
        lines = text.split("\n")
        for line in lines:
            self.extract_courses(line)
            self.extract_major_minor(line, "Major")
            self.extract_major_minor(line, "Minor")
            self.extract_gpa_credits(line)

    def extract_courses(self, line):
        if any(course in line for course in self.course_prefixes):
            match = re.search(r"(\w+ \d{3})", line)
            if match:
                code = match.group(0).replace(" ", "")
                self.data["courses"].append(code)

    def extract_major_minor(self, line, field):
        if field in line:
            info = line.split(":")[1].strip()
            if info not in self.data[field.lower()]:
                self.data[field.lower()].append(info)

    def extract_gpa_credits(self, line):
        if "Combined" in line:
            parts = line.split()
            self.data["gpa"] = parts[parts.index("GPA:") + 1]
            self.data["credits"] = parts[parts.index("Credits:") + 1]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({}))
    else:
        parser = TranscriptParser(sys.argv[1])
        result = parser.parse()
        print(json.dumps(result))
