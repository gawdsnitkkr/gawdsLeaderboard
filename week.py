from datetime import date, datetime, timedelta
import requests
from bs4 import BeautifulSoup

url = "https://github.com/users/DumbMachine/contributions?to={}"
def datespan(startDate, endDate, delta=timedelta(days=1)):
    currentDate = startDate
    while currentDate < endDate:
        yield currentDate
        currentDate += delta
total = 0
weekly_data = []
for day in datespan(date(2018, 1, 1), date(2018, 12, 31),delta=timedelta(days=7)):
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'}
    res = requests.get(url.format(str(day)),headers=headers)
    soup = BeautifulSoup(res.text,'lxml')
    selector = "body > div.js-yearly-contributions > div:nth-child(1) > h2"
    selector = selector.replace("nth-child","nth-of-type")
    content = soup.select(selector)
    contri = str(content[0])
    contributions = contri[contri.find(">")+2:contri.rfind("<")-1].split()[0]
    total+= int(contributions)
    weekly_data.append(total)
    print(len(weekly_data))