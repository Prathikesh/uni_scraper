from bs4 import BeautifulSoup
from extractor.base import BaseExtractor


def safe_text(el):
    return el.get_text(strip=True) if el else None


class SLIITExtractor(BaseExtractor):

    def extract(self, html, url):
        soup = BeautifulSoup(html, "html.parser")

        # --------------------
        # Course Name
        # --------------------
        course_name = None
        
        # Try to extract from page title/meta or main heading
        # SLIIT uses format like: "BSc (Hons) in Information Technology – Specialising in Artificial Intelligence"
        
        # First try: Look for main course heading
        # Page structure: <h1>BrowserHTMLTitle</h1> then course details section
        # The course name appears in bold/strong or as title text
        
        # Try getting from <title> tag
        title_tag = soup.find("title")
        if title_tag:
            title_text = safe_text(title_tag)
            if title_text and len(title_text) > 3:
                # Title is often "CourseType in CourseName | SLIIT" or similar
                # Take the part before the pipe
                course_name = title_text.split("|")[0].strip()
        
        # Fallback: Look for strong tags near the top (SLIIT uses these for titles)
        if not course_name:
            strong_tags = soup.find_all("strong")
            for strong in strong_tags[:5]:  # Check first 5 strong tags
                text = safe_text(strong)
                if text and "bsc" in text.lower() or "msc" in text.lower() or "bachelor" in text.lower():
                    course_name = text
                    break
        
        # Fallback to H1
        if not course_name:
            h1 = soup.find("h1")
            if h1:
                h1_text = safe_text(h1)
                if h1_text and len(h1_text) > 3 and not any(nav in h1_text.lower() for nav in ["home", "contact", "sliit"]):
                    course_name = h1_text

        # --------------------
        # Duration
        # --------------------
        duration = None
        for el in soup.find_all(["p", "li", "span", "div"]):
            text = el.get_text(strip=True)
            # Look for pattern like "Duration : 4 Years" or "Duration: 4 Years"
            if "duration" in text.lower() and "year" in text.lower():
                # Extract just "Duration : X Years"
                import re
                match = re.search(r"duration\s*:\s*(\d+)\s*years?", text, re.IGNORECASE)
                if match:
                    duration = f"Duration : {match.group(1)} Years"
                    break

        # --------------------
        # Entry Requirements
        # --------------------
        eligibility_raw = None
        heading = soup.find(
            string=lambda x: x and "entry requirement" in x.lower()
        )

        if heading:
            parent = heading.find_parent(["section", "div"])
            if parent:
                eligibility_raw = parent.get_text(" ", strip=True)

        return {
            "course_name": course_name,
            "duration": duration,
            "eligibility_raw": eligibility_raw,
            "source_url": url
        }
