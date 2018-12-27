from pymongo import MongoClient
import matplotlib.pyplot as plt
import mpld3
import numpy as np
# years = ["FirstYear","SecondYear","ThirdYear"]
# csv = {"FirstYear": [],"SecondYear": [],"ThirdYear": [],"FourthYear": []}
# for year in years:
#     client = MongoClient()
#     client = MongoClient('localhost', 27017)
#     db = client.test
#     posts = db.python
#     query = posts.find({"year" : year})
#     for item in query:
#         for i in item["weekly_arr"]:
#             csv[year].append(i)


# print(csv)

from datetime import date, datetime, timedelta
import requests
from bs4 import BeautifulSoup
import time

url = "https://github.com/users/war-turtle/contributions?to={}"
def datespan(startDate, endDate, delta=timedelta(days=1)):
    currentDate = startDate
    while currentDate < endDate:
        yield currentDate
        currentDate += delta

    
def weekly_data(username):
    url = "https://github.com/users/placeholder/contributions?to={}".replace("placeholder",username)
    total = 0
    weekly_data = []
    new = []
    newnew= []
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'}
    for day in datespan(date(2018, 1, 1), date(2019, 1, 1),delta=timedelta(days=7)):
        time.sleep(1)
        res = requests.get(url.format(str(day)),headers=headers)
        soup = BeautifulSoup(res.text,'lxml')
        selector = "body > div.js-yearly-contributions > div:nth-child(1) > h2"
        selector = selector.replace("nth-child","nth-of-type")
        content = soup.select(selector)
        contri = str(content[0])
        contributions = contri[contri.find(">")+2:contri.rfind("<")-1].split()[0]
        total+= int(contributions)
        weekly_data.append(total)
        #print(len(weekly_data))
    for i in range(len(weekly_data)-1):
        new.append(weekly_data[i+1]-weekly_data[i])
    for i in range(len(new)-1):
        if new[i]<0:
            new[i]=0
        newnew.append(new[i+1]-new[i])
    return newnew
    
members = {
    "FirstYear": [
        "dikshantj",
        "VINJIT",
        "DumbMachine",
        "kforkaran",
        "mahendra1290",
        "nandinigoel10",
        "rekhansh99",
        "Shubhanshu88"
    ],
    "SecondYear": [
        "Abhi-1198",
        "prathamzx",
        "Anshika85",
        "gabilash",
        "kaushkay",
        "naman-gupta99",
        "war-turtle"
    ],
    "ThirdYear": [
        "phoenixking25",
        "avinashbharti97",
        "aakash947",
        "anushka5sep",
        "tourist314159",
        "m0nk3ydluffy",
        "shivi98g"
    ],
    "FourthYear": [
        "arpit007",
        "kayforkaran",
        "nkkumawat",
        "rishabh2609",
        "ParagiSinghal"
    ]
}

from bs4 import BeautifulSoup
import requests
import json
from pymongo import MongoClient
import matplotlib.pyplot as plt, mpld3
import pandas as pd
import random 

def mongo_pusher(object):
    client = MongoClient()
    client = MongoClient('mongodb://ratin:123qwe456rty@ds143594.mlab.com:43594/leaderboard')
    db = client.leaderboard
    posts = db.users
    posts.insert_one(object)
    
def basic_info(username):
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'}
    arr= ['id','node_id','gravatar_id','url','followers_url','following_url','gists_url','starred_url','subscriptions_url','organizations_url','repos_url','events_url','received_events_url','type','site_admin','company','blog','location','hireable','created_at','updated_at']
    url = "https://api.github.com/users/{}?client_id=1a5afd0975169dac1e83&client_secret=a165dbd28f3c7dd3d4be06ef998a465319ff90c6".format(username)
    r = requests.get(url,headers = headers)
    if(r.ok):
        stuff = json.loads(r.text)
        for name in arr:
            stuff.pop(name,None)
    return stuff


def fun(members):
    for year in members:
        for member in members[year]:
            user_objecty = basic_info(member)
            url = "https://github.com/users/{}/contributions?".format(member)
            headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'}
            res = requests.get(url,headers = headers,verify=True)
            soup = BeautifulSoup(res.text,'lxml')
            g_selector = "body > div.js-yearly-contributions > div:nth-child(1) > div > div.js-calendar-graph.is-graph-loading.graph-canvas.calendar-graph.height-full > svg"
            selector = "body > div.js-yearly-contributions > div:nth-child(1) > h2"
            selector = selector.replace("nth-child","nth-of-type")
            g_selector = g_selector.replace("nth-child","nth-of-type")
            content = soup.select(selector)
            graph = soup.select(g_selector)
            contri = str(content[0])
            contributions = contri[contri.find(">")+2:contri.rfind("<")-1].split()[0]
            grap=str(graph[0])
            grap = grap.replace(grap[grap.find("<text"):grap.rfind("</svg>")],"")
            # html_file = open("tile.html","w")
            # html_file.write(grap)
            # html_file.close()
            print(member)
            user_objecty["contributions"]= contributions
            user_objecty["graph"] = grap
            user_objecty["year"] = year
            t = weekly_data(member)
            user_objecty["weekly_arr"] = weekly_data(member)
            user_objecty["access_token"] = 69
            mongo_pusher(user_objecty)
            print(sum(t))
    
fun(members)