#!/usr/bin/env python3
"""
Test the complete API endpoint flow with AI insights
"""

import json
from api.recommender import recommend_courses
from api.ai_features import generate_ai_insights

# Create a realistic AL student
al_student = {
    "name": "Kasun Perera",
    "science": 85,
    "maths": 90,
    "english": 75,
    "al_subject_1": "Information Technology",
    "al_score_1": 92,
    "al_subject_2": "Mathematics",
    "al_score_2": 88,
    "al_subject_3": "Physics",
    "al_score_3": 84,
    "preferences": "Software development and web technologies"
}

print("\n" + "=" * 80)
print("🧪 FULL API ENDPOINT TEST - AL LEVEL")
print("=" * 80)

# Get recommendations
print(f"\n📚 Getting recommendations for: {al_student['name']}")
recommendations = recommend_courses(al_student, level='AL')

print(f"\n✅ Found {len(recommendations.get('recommendations', []))} recommended courses:")
for i, course in enumerate(recommendations.get('recommendations', [])[:5], 1):
    print(f"  {i}. {course['course_name']}")
    print(f"     Score: {course.get('final_score', 0):.2%} | Uni: {course.get('university', 'N/A')}")

# Generate AI insights
if recommendations.get('recommendations'):
    print(f"\n🤖 Generating AI insights for top 3 courses...")
    ai_insights = generate_ai_insights(al_student, recommendations.get('recommendations', []), 'AL')
    
    print(f"\n✅ AI Insights Generated!")
    print(f"   Timestamp: {ai_insights.get('timestamp')}")
    print(f"   Student Level: {ai_insights.get('student_level')}")
    print(f"   Analyses: {len(ai_insights.get('analysis', []))}")
    
    for analysis in ai_insights.get('analysis', []):
        print(f"\n   📌 #{analysis['rank']}: {analysis['course']}")
        print(f"      • Match Score: {analysis['match_score']:.2%}")
        print(f"      • Career Path: {analysis['career_path']['field_name']}")
        print(f"        - Jobs: {', '.join([c['role'] for c in analysis['career_path']['career_options'][:2]])}")
        print(f"      • Skill Readiness: {analysis['skill_gaps']['readiness_score']:.0f}% ({analysis['skill_gaps']['readiness_level']})")
        print(f"      • Job Market: {analysis['job_market']['alignment_score']}% alignment")
        print(f"        - Demand: {analysis['job_market']['demand_score']}/100 {analysis['job_market']['trend_icon']}")
        print(f"        - Growth: {analysis['job_market']['growth_rate']}% annual")

print("\n" + "=" * 80)
print("✨ API TEST COMPLETED SUCCESSFULLY!")
print("=" * 80 + "\n")
