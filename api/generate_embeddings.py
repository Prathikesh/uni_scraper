from sentence_transformers import SentenceTransformer
from pymongo import MongoClient
import numpy as np

# Load model
print("Loading Sentence-BERT model...")
model = SentenceTransformer('all-MiniLM-L6-v2')  # Fast, lightweight model

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["ugc_scraper"]
courses_col = db["courses"]

print("Generating embeddings for all courses...")
courses = list(courses_col.find())

print(f"Found {len(courses)} courses to process")

for i, course in enumerate(courses):
    # Combine course name and description for better matching
    text = f"{course.get('course_name', '')} {course.get('description', '')} {course.get('keywords', '')}"
    
    # Generate embedding
    embedding = model.encode(text)
    
    # Update course with embedding
    courses_col.update_one(
        {"_id": course["_id"]},
        {"$set": {"embedding": embedding.tolist()}}
    )
    
    if (i + 1) % 100 == 0:
        print(f"Processed {i + 1}/{len(courses)} courses")

print(f"✅ All {len(courses)} course embeddings generated successfully!")
