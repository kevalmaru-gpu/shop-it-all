import bs4
from bs4 import BeautifulSoup as bs
import requests

# name, rating, price, main_category, sub_category, image

link='https://www.flipkart.com/search?q=furniture&sid=wwe%2C7p7&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_9_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_9_na_na_na&as-pos=1&as-type=RECENT&suggestionId=furniture%7CBeds+%26+More&requestId=b9a8b21c-9890-4bec-b1c9-6a771370374f&as-searchtext=furniture'
link1='https://www.flipkart.com/search?q=fiction%20books&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'
link2='https://www.flipkart.com/search?q=woman%20clothing&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'
link3='https://www.flipkart.com/search?q=sneakers+for+men&sid=osp%2Ccil%2Ce1f&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_na&as-pos=1&as-type=RECENT&suggestionId=sneakers+for+men%7CCasual+Shoes&requestId=16f27984-2357-435c-85c4-43a324a16f89&as-searchtext=sne'
link4='https://www.flipkart.com/search?q=laptop&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'

cat = ['books', 'cloths', 'sneakers', 'tech']

page=requests.get(link4)
soup=bs(page.content, 'html.parser')

p_links=[]
data = []

links=soup.findAll('a', class_='_1fQZEK')
for link in links:
    p_links.append('https://www.flipkart.com' + link.attrs.get('href'))

i = 0
for link in p_links:
    if i > 10:
        break
    page=requests.get(link)
    soup=bs(page.content, 'html.parser')
    print(i)
    try:
        d = {
        "image": soup.find('img', '_396cs4 _2amPTt _3qGmMb').attrs.get('src'),
        "name": soup.find("span", "B_NuCI").text,
        "price": soup.find("div", "_30jeq3 _16Jk6d").text,
        "rating": soup.find("div", "_3LWZlK").text,
        "main_category": "tech",
        "sub_category": "null",
        }
        
        data.append(d)
    except:
        print("not found for " + str(i))    
    i+=1

requests.post('http://localhost:8000/product/add', json=data, headers={'Content-Type':'application/json'})