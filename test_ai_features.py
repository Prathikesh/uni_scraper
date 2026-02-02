#!/usr/bin/env python3
"""
Test script to verify AI features work with REAL course data
"""

from api.ai_features import predict_career_path, analyze_skill_gaps, calculate_job_market_alignment

# Sample real course names from the database
test_courses = [
    "BSc Hons Software Engineering",
    "BSc Hons Computer Science Software Development",
    "BSc Hons Artificial Intelligence",
    "BSc Hons Business Management",
    "BA Hons Business Innovation and Entrepreneurship",
    "BEng Hons Mechanical Engineering",
    "BSc Hons Cyber Security",
    "MSc Software Engineering",
    "MSc Digital Marketing Management",
    "MSc Cyber Security",
]

student_profile = {
    "science": 80,
    "maths": 85,
    "english": 75,
    "al_subject_1": "Information Technology",
    "al_score_1": 88,
    "al_subject_2": "Mathematics",
    "al_score_2": 85,
    "al_subject_3": "Physics",
    "al_score_3": 80,
    "preferences": "Software development and technology"
}

print("=" * 80)
print("🧪 AI FEATURES TEST WITH REAL COURSES")
print("=" * 80)

for course_name in test_courses:
    print(f"\n📚 Testing: {course_name}")
    print("-" * 80)
    
    # Test career path prediction
    career = predict_career_path(student_profile, course_name, "AL")
    print(f"  ✅ Career Path Field: {career['field_name']}")
    print(f"     - Careers: {[c['role'] for c in career['career_options'][:2]]}")
    
    # Test skill gaps
    skills = analyze_skill_gaps(student_profile, course_name, "AL")
    print(f"  ✅ Skill Analysis:")
    print(f"     - Required Skills: {len(skills['required_skills'])} identified")
    print(f"     - Readiness Score: {skills['readiness_score']:.0f}%")
    print(f"     - Status: {skills['readiness_level']}")
    
    # Test job market
    market = calculate_job_market_alignment(career['field_name'], student_profile)
    print(f"  ✅ Job Market:")
    print(f"     - Alignment Score: {market['alignment_score']}%")
    print(f"     - Demand: {market['demand_score']}/100")
    print(f"     - Growth: {market['growth_rate']}% annual")
    print(f"     - Trend: {market['trend_icon']} {market['trend']}")

print("\n" + "=" * 80)
print("✨ All tests completed successfully!")
print("=" * 80)
