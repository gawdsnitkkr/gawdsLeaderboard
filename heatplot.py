import seaborn as sns
from pymongo import MongoClient
from PIL import Image
import sys
import os

def heatplot(username1, username2):
    client = MongoClient('localhost', 27017)
    db = client.test
    users = db.users
    query = users.find({"login":username1})
    for item in query:
        username1 = item["weekly_arr"]
    
    query = users.find({"login":username2})
    for item in query:
        username2 = item["weekly_arr"]
    data = [username1,username2]

    ax = sns.heatmap(data)
    ax.get_figure().savefig("./app/views/partials/temp.png")
    i = Image.open("./app/views/partials/temp.png")
    w,h = i.size
    i.crop((80, 58, w-163, h-53)).save("./app/views/partials/output.png")
    os.remove("./app/views/partials/temp.png")
    plt.close()
    print("Render Complete!!")
    print(data)

#usernames = [sys.argv[1], sys.argv[2]]
#heatplot(usernames[0],usernames[1])
heatplot("war-turtle","DumbMachine")
