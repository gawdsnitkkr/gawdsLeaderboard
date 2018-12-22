import sys
from pymongo import MongoClient
import matplotlib.pyplot as plt
import mpld3

def plt_html_line(data,username,size,NoHtml=False):
    fig = plt.figure()
    plt.plot(data,color='#9966ff')
    plt.rcParams['axes.facecolor'] = "#d2e0f3"
    plt.rcParams['lines.linewidth'] = 5
    plt.xticks([], [])
    plt.yticks([], [])
    plt.xlabel('weeks')
    plt.ylabel('commits')
    plt.rcParams["figure.figsize"] = size
    if NoHtml==False:
        mpld3.save_html(fig,"./app/views/partials/plot.ejs")
        mpld3.fig_to_html(fig,template_type="simple")
    #plt.show()

def person_plot(username,NoHtml = False,size=[3,2]):
    client = MongoClient()
    client = MongoClient('localhost', 27017)
    db = client.test
    posts = db.posts
    query = posts.find({"login":username})
    for item in query:
        data = item["weekly_arr"]
        plt_html_line(data,username,size,NoHtml)


username = sys.argv[1]
person_plot(username, NoHtml=True)
person_plot(username,NoHtml=False)
print("Plot Created!!")
