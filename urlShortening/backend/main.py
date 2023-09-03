import uuid
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

localDb = []

def shortenurl(url: str) -> str:
    shorturl = ""
    shorturl = str(uuid.uuid4())[:6] # create 6 character long random uuid
    # check if shorturl already exists
    for i in localDb:
        if i["shortUrl"] == shorturl:
            # if exists, call the function again
            shortenurl(url)
    return "http://short.est/"+shorturl

class Url(BaseModel):
    url: str

class Shorturl(BaseModel):
    shorturl: str

@app.post("/encode/")
def encode_item(item: Url):
    print(item)
    global localDb 
    shorturl = shortenurl(item.url)
    localDb.append({"url": item.url, "shortUrl": shorturl})
    return {"url": item.url, "shortUrl": shorturl}

@app.post("/decode/")
def decode_item(item: Shorturl):
    for i in localDb:
        if i["shortUrl"] == item.shorturl:
            return {i["url"]}
    
@app.get("/list")
def list_items():
    return localDb