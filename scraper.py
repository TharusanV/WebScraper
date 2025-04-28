import sys
import json
import requests
from bs4 import BeautifulSoup

def scrape(url, targets):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except Exception as e:
        return {"error": str(e)}

    soup = BeautifulSoup(response.text, 'html.parser')
    result = {}

    for target in targets:
        selector = target.get('selector')
        scrape_type = target.get('type')  # "text" or "attribute"
        attribute = target.get('attribute')  # Only needed if type = "attribute"

        if not selector or not scrape_type:
            continue  # Skip invalid target

        # CSS select e.g.
            # h1                        All <tag> elements
            # .classname                All elements with class="classname"
            # #id,                      Element with id="idname"
            # div.classname	        <tag> with class "classname"
            # section#idname	        <section> with id "idname"
            # ul > li	                All <li> directly under a <ul>
        elements = soup.select(selector)   
        data = []

        for el in elements:
            if scrape_type == "text":
                data.append(el.get_text(strip=True))
            elif scrape_type == "attribute" and attribute:
                data.append(el.get(attribute, ''))

        result[selector] = data

    return result

def main():
    input_data = sys.stdin.read()
    params = json.loads(input_data)

    url = params.get('url')
    targets = params.get('targets', [])

    if not url:
        print(json.dumps({"error": "No URL provided"}))
        return

    scraped_data = scrape(url, targets)
    print(json.dumps(scraped_data))

if __name__ == "__main__":
    main()


"""
{
  "url": "https://example.com",
  "targets": [
    { "selector": "h1", "type": "text" },
    { "selector": "meta[name='description']", "type": "attribute", "attribute": "content" },
    { "selector": "img", "type": "attribute", "attribute": "src" },
    { "selector": "a", "type": "attribute", "attribute": "href" }
  ]
}
"""
