from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["ugc_scraper"]

universities = db["universities"]
courses = db["courses"]

print("\n" + "="*60)
print("📊 SCRAPING STATISTICS")
print("="*60)

# Total counts
uni_count = universities.count_documents({})
course_count = courses.count_documents({})

print(f"\n✅ Total Universities: {uni_count}")
print(f"✅ Total Courses: {course_count}")

# Courses per university
print("\n" + "="*60)
print("📚 COURSES PER UNIVERSITY")
print("="*60)

for uni in universities.find().sort("name", 1):
    count = courses.count_documents({"university_id": uni["_id"]})
    print(f"  • {uni['name']:<45} {count:>4} courses")

# Sample course
print("\n" + "="*60)
print("📝 SAMPLE COURSE")
print("="*60)

sample = courses.find_one()
if sample:
    print(f"\nCourse: {sample.get('course_name')}")
    print(f"Duration: {sample.get('duration')}")
    print(f"Source: {sample.get('source_url')}")
    print(f"Eligibility: {sample.get('eligibility')}")

print("\n" + "="*60 + "\n")
