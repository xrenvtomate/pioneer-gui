from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from wifis import wifi_list, connect, check_connection

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


@app.post('/connect_host')
def connect_handler(data: dict):
    ssid = data['ssid']
    connect(ssid)
    return {'res': 'success'}
