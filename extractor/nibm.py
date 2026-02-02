from bs4 import BeautifulSoup
from extractor.base import BaseExtractor


def safe_text(el):
    return el.get_text(strip=True) if el else None


class NIBMExtractor(BaseExtractor):

    def extract(self, html, url):
        soup = BeautifulSoup(html, "html.parser")

        # =========================
        # COURSE NAME (NIBM FIXED)
        # =========================

        course_name = None

        # 1️⃣ Primary: first visible H1
        h1 = soup.find("h1")
        if h1:
            text = safe_text(h1)
            if text and len(text) > 5:
                course_name = text

        # 2️⃣ Fallback: page title
        if not course_name:
            title_tag = soup.find("title")
            if title_tag:
                course_name = (
                    title_tag.get_text(strip=True)
                    .replace("| NIBM", "")
                    .replace("– NIBM", "")
                    .strip()
                )

        # 3️⃣ Last fallback: URL slug
        if not course_name:
            course_name = (
                url.rstrip("/")
                .split("/")[-1]
                .replace("-", " ")
                .title()
            )

        # =========================
        # DURATION
        # =========================

        duration = None
        for el in soup.find_all(["p", "li", "span"]):
            t = el.get_text(strip=True).lower()
            if "year" in t or "month" in t:
                duration = el.get_text(strip=True)
                break

        # =========================
        # ELIGIBILITY
        # =========================

        eligibility_raw = None
        eligibility_heading = soup.find(
            string=lambda x: x and (
                "entry requirement" in x.lower()
                or "eligibility" in x.lower()
            )
        )

        if eligibility_heading:
            parent = eligibility_heading.find_parent(["section", "div"])
            if parent:
                eligibility_raw = parent.get_text(" ", strip=True)

        return {
            "course_name": course_name,
            "duration": duration,
            "eligibility_raw": eligibility_raw,
            "source_url": url
        }
