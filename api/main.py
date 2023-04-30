from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from wifis import wifi_list, connect

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/list/")
def list_wifis():
    return wifi_list()


@app.post('/connect')
def connect_handler(data: dict):
    print(data)
    ssid = data['ssid']
    password = '228228228'
    connect(ssid, password)
    return {'message': 'Data received'}
