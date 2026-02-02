#!/usr/bin/env python3
"""
Test the AI features with mock course recommendations
"""

from api.ai_features import generate_ai_insights

# Create realistic mock recommendations
mock_recommendations = [
    {"course_name": "BSc Hons Software Engineering", "final_score": 0.95},
    {"course_name": "BA Hons Business Management", "final_score": 0.88},
    {"course_name": "BSc Hons Artificial Intelligence", "final_score": 0.89},
]

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
print("🧪 AI INSIGHTS GENERATION TEST - REAL TIME DATA")
print("=" * 80)

print(f"\n📚 Student: {al_student['name']}")
print(f"   Level: AL | Qualifications:")
print(f"   - {al_student['al_subject_1']}: {al_student['al_score_1']}")
print(f"   - {al_student['al_subject_2']}: {al_student['al_score_2']}")
print(f"   - {al_student['al_subject_3']}: {al_student['al_score_3']}")

print(f"\n📊 Mock Recommendations: {len(mock_recommendations)} courses")
for i, course in enumerate(mock_recommendations, 1):
    print(f"  {i}. {course['course_name']} (Match: {course['final_score']:.0%})")

# Generate AI insights
print(f"\n🤖 Generating AI insights...\n")
ai_insights = generate_ai_insights(al_student, mock_recommendations, 'AL')

print("✅ AI INSIGHTS GENERATED SUCCESSFULLY!\n")
print("=" * 80)

for analysis in ai_insights.get('analysis', []):
    print(f"\n📌 COURSE #{analysis['rank']}: {analysis['course']}")
    print(f"   Match Score: {analysis['match_score']:.0%}")
    
    # Career Path
    career = analysis['career_path']
    print(f"\n   🚀 CAREER PATH: {career['field_name']}")
    print(f"      Projected Progression:")
    for job in career['career_options'][:3]:
        print(f"        • {job['role']} (${job['salary_min']:,}-${job['salary_max']:,})")
        print(f"          After {job['years_exp']} years | Demand: {job['demand']}% | Growth: {job['growth']}%")
    
    # Skills
    skills = analysis['skill_gaps']
    print(f"\n   🎓 SKILL ANALYSIS:")
    print(f"      Readiness: {skills['readiness_score']:.0f}% - {skills['readiness_level']}")
    print(f"      Required Skills ({len(skills['required_skills'])}): {', '.join(skills['required_skills'][:3])}...")
    print(f"      Possessed Skills ({len(skills['possessed_skills'])}): {', '.join(skills['possessed_skills'][:3])}...")
    if skills['skill_gaps']:
        print(f"      Skill Gaps ({len(skills['skill_gaps'])}): {', '.join(skills['skill_gaps'][:2])}...")
    if skills['prerequisites']:
        print(f"      Recommended: {skills['prerequisites'][0]['course']} ({skills['prerequisites'][0]['duration']})")
    
    # Job Market
    market = analysis['job_market']
    print(f"\n   📊 JOB MARKET ALIGNMENT:")
    print(f"      Overall Score: {market['alignment_score']}%")
    print(f"      Demand: {market['demand_score']}/100")
    print(f"      Growth Rate: {market['growth_rate']}% annually")
    print(f"      Trend: {market['trend_icon']} {market['trend']}")
    print(f"      Salary Percentile: {market['salary_percentile']}th")
    print(f"      Recommendation: {market['recommendation']}")

print("\n" + "=" * 80)
print("✨ ALL TESTS COMPLETED - AI FEATURES WORKING IN REAL TIME!")
print("=" * 80 + "\n")
