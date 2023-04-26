from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from wifis import wifi_list

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    with open('data.txt', 'r') as f:
        n = int(f.read())
    n += 1
    print(123)

    with open('data.txt', 'w') as f:
        f.write(str(n))

    return {"message": f"hello {n}"}

@app.get("/list/")
def read_root():
    return wifi_list()