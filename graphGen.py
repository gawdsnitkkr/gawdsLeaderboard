import sys
from pymongo import MongoClient
import matplotlib.pyplot as plt
import mpld3

def plt_html_line(data,username,NoHtml=False):
    fig = plt.figure()
    #print(len(data))
    plt.plot(data,color='#9966ff')
    plt.rcParams['axes.facecolor'] = "#d2e0f3"
    plt.rcParams['lines.linewidth'] = 5
    plt.xticks([], [])
    plt.yticks([], [])
    plt.xlabel('weeks')
    plt.ylabel('commits')
    plt.rcParams["figure.figsize"] = [3,2]
    # if NoHtml==False and month==True:
    #     mpld3.save_html(fig,"./app/views/partials/plotmonth.ejs")

    mpld3.save_html(fig,"./app/views/partials/plotweek.ejs")

    #plt.show()


def person_plot_week(username,NoHtml = False,size=[3,2],month=False):
    client = MongoClient()
    client = MongoClient('localhost', 27017)
    db = client.test
    posts = db.users
    query = posts.find({"login":username})
    for item in query:
        data = item["weekly_arr"]
        plt_html_line(data,username,size)

# def plt_html_scatter(data,data2,NoHtml=False):
#     fig = plt.figure()
#     print(len(data))
#     print(len(data2))
#     plt.plot(data2,data,color='#9966ff')
#     plt.rcParams['axes.facecolor'] = "#d2e0f3"
#     plt.rcParams['lines.linewidth'] = 5
#     plt.xticks([], [])
#     plt.yticks([], [])
#     plt.xlabel('weeks')
#     plt.ylabel('commits')
#     plt.rcParams["figure.figsize"] = [3,2]
#     if NoHtml==False:
#         mpld3.save_html(fig,"./app/views/partials/plot.ejs")
#         mpld3.fig_to_html(fig,template_type="simple")
#     plt.show()

def person_plot_month(username,NoHtml=False,size=[3,2],month=True):
    client = MongoClient()
    client = MongoClient('localhost', 27017)
    db = client.test
    posts = db.users
    query = posts.find({"login":username})
    for item in query:
        i=0
        q=[]
        data = item["weekly_arr"]
        while i<len(data):
            q.append(sum(data[i:i+5]))
            i=i+5
        print(q)
        plt_html_line(q,[0,1,2,3,4,5,6,7,8,9],NoHtml)


username = sys.argv[1]
# username = "DumbMachine"
# person_plot_month(username, NoHtml=True)
# person_plot_month(username, NoHtml=False)
person_plot_week(username, NoHtml=True)
person_plot_week(username,NoHtml=False)
print("Plot Created!!")

