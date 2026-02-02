# SLIIT University Integration - Summary

## Overview
Successfully added SLIIT (Sri Lanka Institute of Information Technology) as the 7th university to the university course scraper system.

## Changes Made

### 1. Configuration Update (`config/universities.json`)
Added SLIIT entry with the following configuration:
```json
{
  "id": "sliit",
  "name": "SLIIT",
  "type": "sliit",
  "base_url": "https://www.sliit.lk",
  "sitemap_url": "https://www.sliit.lk/sitemap.xml",
  "course_url_pattern": "/programmes/"
}
```

**Details:**
- **Base URL**: https://www.sliit.lk
- **Sitemap**: Uses main sitemap.xml which contains all course URLs
- **Course Pattern**: `/programmes/` (courses are organized under faculty-specific paths like `/computing/programmes/`, `/engineering/programmes/`, `/business/programmes/`, `/humanities-sciences/programmes/`)

### 2. New Extractor Module (`extractor/sliit.py`)
Created SLIITExtractor class that:
- **Extracts course name**: From H1/H2 headings (e.g., "BSc (Hons) in Software Engineering")
- **Extracts duration**: Looks for "Duration : X Years" format in course page
- **Extracts entry requirements**: Scans for "Entry requirements" section and captures full requirements text
- **Handles SLIIT-specific HTML structure**: Uses BeautifulSoup to parse the course pages

### 3. Main Script Integration (`main.py`)
- **Added import**: `from extractor.sliit import SLIITExtractor`
- **Registered extractor**: Added `"sliit": SLIITExtractor` to EXTRACTORS dictionary

## How It Works

### Course Discovery Flow:
1. Scraper reads `config/universities.json`
2. For SLIIT, it accesses `https://www.sliit.lk/sitemap.xml`
3. Extracts all URLs matching `/programmes/` pattern
4. For each course URL, downloads HTML and uses SLIITExtractor to parse:
   - Course name
   - Duration
   - Entry requirements/eligibility criteria

### Course Data Structure:
```python
{
    "course_name": "BSc (Hons) in Software Engineering",
    "duration": "Duration : 4 Years",
    "eligibility_raw": "Local A/Ls: Minimum of 3 \"S\" passes...",
    "source_url": "https://www.sliit.lk/computing/programmes/software-engineering-degree/"
}
```

## SLIIT University Information
- **Type**: Largest non-state higher education institute in Sri Lanka
- **Founded**: 1999
- **Faculties**: Computing, Engineering, Business, Humanities & Sciences
- **Campus Locations**: Malabe (main), Colombo, Matara, Kandy, Kurunegala, Jaffna
- **Accreditations**:
  - Approved by Ministry of Education & University Grants Commission (UGC)
  - Member of Association of Commonwealth Universities (ACU)
  - Member of International Association of Universities (IAU)
  - Accredited by Institution of Engineering & Technology, UK
- **Programs**: 50+ undergraduate, postgraduate, and professional courses

## Course Categories at SLIIT
- **Computing**: Software Engineering, Data Science, Cyber Security, Information Technology, Interactive Media, etc.
- **Engineering**: Civil, Mechanical, Electrical/Electronic, Materials, Quantity Surveying, Architecture
- **Business**: Business Management, Accounting & Finance, Marketing, HR, Supply Chain, etc.
- **Humanities & Sciences**: Psychology, Biomedical Science, Law, Nursing, Education, etc.

## Next Steps
1. Run the scraper: `python3 main.py`
2. Monitor the output for SLIIT course discovery and extraction
3. Verify courses appear in MongoDB with correct data
4. Test AI recommendations with SLIIT courses in the frontend
5. Monitor for any extraction issues (HTML structure may vary between course pages)

## Testing Notes
- SLIIT course pages have consistent HTML structure with h1/h2 titles
- Entry requirements section is clearly marked
- Duration information is displayed in tabular format
- All courses follow the `/programmes/` URL pattern for easy identification
- Approximately 50+ courses expected to be scraped from SLIIT

## Troubleshooting
If courses aren't being extracted properly:
1. Check if the course URL matches `/programmes/` pattern
2. Verify the HTML structure hasn't changed using `https://www.sliit.lk/sitemap.xml`
3. Check SLIITExtractor's fallback methods in sliit.py
4. Review the raw HTML download in `artifacts/sliit/` folder
