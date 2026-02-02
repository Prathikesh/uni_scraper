import re
import requests
from crawler.sitemap import fetch_sitemap_urls
from crawler.robots import can_fetch


# =====================================================
# Horizon course regex
# =====================================================
HORIZON_COURSE_REGEX = re.compile(
    r"/(bsc|bm|bit|bed|b_law|msc|med)[a-z0-9_]*$",
    re.IGNORECASE
)


# =====================================================
# BCAS course validator
# =====================================================
BCAS_EXCLUDE_SLUGS = {
    "business-management",
    "computing",
    "construction-engineering",
    "health-science",
    "hotel-management-tourism",
    "language-education",
    "law",
    "certification",
    "diploma",
    "foundation",
    "higher-national-diploma",
    "bachelors-degree",
    "post-graduate-diploma",
    "master",
    "masters",
    "programme",
}

def is_bcas_course(url: str) -> bool:
    if "/programme/" not in url:
        return False

    slug = url.rstrip("/").split("/")[-1].lower()
    if slug in BCAS_EXCLUDE_SLUGS:
        return False

    return "-" in slug


# =====================================================
# IIT course validator
# =====================================================
def is_iit_course(url: str) -> bool:
    return any(p in url for p in [
        "/programme/",
        "/programmes/",
        "/course/",
    ])


# =====================================================
# ANC course validator
# =====================================================
def is_anc_course(url: str) -> bool:
    if (
        "/undergraduate-programs/" in url
        or "/postgraduate-programs/" in url
    ):
        slug = url.rstrip("/").split("/")[-1]

        if slug in {
            "undergraduate-programs",
            "postgraduate-programs",
            "uk-undergraduate-programs-top-ups",
            "american-undergraduate-programs",
            "uk-postgraduate-degree-programs",
        }:
            return False

        return "-" in slug

    return False


# =====================================================
# APIIT course validator
# =====================================================
def is_apiit_course(url: str) -> bool:
    # Only include /courses/ URLs, exclude images and static files
    if "/courses/" not in url:
        return False
    
    # Exclude image, CSS, JS files
    exclude_extensions = {'.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.pdf'}
    if any(url.lower().endswith(ext) for ext in exclude_extensions):
        return False
    
    return True


# =====================================================
# SLIIT course validator
# =====================================================
def is_sliit_course(url: str) -> bool:
    # SLIIT courses have multiple patterns:
    # /computing/programmes/artificial-intelligence-degree/
    # /professional-programmes/certificate-program-in-...
    # /graduate-studies/programms/msc-programmes/...
    # /engineering/programmes/bsc-hons-in-quantity-surveying/
    
    # All course URLs contain /programmes/ (or /programms/)
    if "/programmes/" not in url and "/programms/" not in url:
        return False
    
    # Exclude category index pages (single word after /programmes/)
    slug = url.rstrip("/").split("/")[-1]
    
    # Index pages like "programmes/", "computing/", etc - no hyphens
    if "-" not in slug:
        return False
    
    # Exclude obvious non-course pages
    exclude_patterns = ("/blog/", "/news/", "/event", "/about/", "/facilities/", "/staff/", "/contact/")
    if any(pattern in url.lower() for pattern in exclude_patterns):
        return False
    
    return True


# =====================================================
# ESOFT course validator (uses sitemap approach)
# =====================================================
def is_esoft_course(url: str) -> bool:
    # ESOFT courses are posts like:
    # /london-metropolitan-university-top-up-management/
    # /pearson-btec-hnd/
    # /british-mba-with-specialisations/
    
    # Exclude media files (images, videos, etc)
    media_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.mp4', '.pdf', '.zip')
    if any(url.lower().endswith(ext) for ext in media_extensions):
        return False
    
    # Exclude /wp-content/ URLs (media/uploads)
    if '/wp-content/' in url:
        return False
    
    # Exclude non-course URLs
    exclude_patterns = (
        "/news/", "/blog", "/event", "/page/",
        "/schools/", "/careers/", "/contact", "/about",
        "/student", "/privacy", "/payment", "/refund", "/quality", "/cookie"
    )
    
    if any(pattern in url.lower() for pattern in exclude_patterns):
        return False
    
    # Must have dashes in slug (courses usually have descriptive names)
    slug = url.rstrip("/").split("/")[-1]
    if "-" not in slug:
        return False
    
    return True


# =====================================================
# MAIN DISCOVERY FUNCTION
# =====================================================
def discover_course_urls(university: dict) -> list[str]:

    # 🔥 All universities use sitemap-based discovery with validators
    urls = fetch_sitemap_urls(university["sitemap_url"])
    results = []

    for url in urls:

        if university["type"] == "apiit":
            if not is_apiit_course(url):
                continue

        if university["type"] == "horizon":
            if not HORIZON_COURSE_REGEX.search(url):
                continue

        if university["type"] == "bcas":
            if not is_bcas_course(url):
                continue

        if university["type"] == "iit":
            if not is_iit_course(url):
                continue

        if university["type"] == "anc":
            if not is_anc_course(url):
                continue

        if university["type"] == "sliit":
            if not is_sliit_course(url):
                continue
        
        if university["type"] == "esoft":
            if not is_esoft_course(url):
                continue

        if can_fetch(university["base_url"], url):
            results.append(url)

    return results
