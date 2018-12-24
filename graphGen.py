import sys
from pymongo import MongoClient
import matplotlib.pyplot as plt
import mpld3

def plt_html_line(data,username,NoHtml):
    fig = plt.figure()
    #print(len(data))
    plt.plot(data,color='#9966ff')
    plt.plot(data,"bo",color='#ccb2ff')
    plt.rcParams['axes.facecolor'] = "#dbe6f5"
    plt.rcParams['lines.linewidth'] = 5
    plt.xticks([], [])
    plt.yticks([], [])
    plt.title("Weeks vs Commit")
    plt.xlabel('weeks')
    plt.ylabel('commits')
    plt.rcParams["figure.figsize"] = [4,2]
    if NoHtml==False:    
        mpld3.save_html(fig,"./app/views/partials/plotweek.ejs")

    #plt.show()

def person_plot_month(username,NoHtml):    
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
        plt_html_scatter([0,1,2,3,4,5,6,7,8,9],q,NoHtml)

def plt_html_scatter(data,data2,NoHtml):
    fig = plt.figure()
    plt.plot(data,data2,marker='2',color='#9966ff', mew="10", ms=9)
    plt.rcParams['axes.facecolor'] = "#d2e0f3"
    plt.rcParams['lines.linewidth'] = 5
#     plt.tick_params(
#     axis='both',          # changes apply to the x-axis
#     which='both',      # both major and minor ticks are affected
#     bottom=False,      # ticks along the bottom edge are off
#     top=False,         # ticks along the top edge are off
#     labelbottom=False)
    plt.yticks([], [])
    plt.legend("commits")
    plt.title("Months vs Commit")
    plt.xlabel('months')
    plt.ylabel('commits')
    plt.rcParams["figure.figsize"] = [4,2]
    if NoHtml==False:
        mpld3.save_html(fig,"./app/views/partials/plotmonth.ejs")
    #plt.show()

def person_plot_week(username,NoHtml): 
    client = MongoClient()
    client = MongoClient('localhost', 27017)
    db = client.test
    posts = db.users
    query = posts.find({"login":username})
    for item in query:
        data = item["weekly_arr"]
        plt_html_line(data,username,NoHtml)

username = sys.argv[1]
#username = "DumbMachine"
# person_plot_month(username, NoHtml=True)
# person_plot_month(username, NoHtml=False)
person_plot_week(username, NoHtml=True)
person_plot_week(username,NoHtml=False)
print("week")

person_plot_month(username, NoHtml=True)
print("Plot Created1!!")
person_plot_month(username,NoHtml=False)
print("Plot Created2!!")





