from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pioneer_sdk import Pioneer, Camera
import numpy as np
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
    ssid = data['ssid']
    password = '12345678'
    connect(ssid, password)
    pioneer = Pioneer()
    return {'res': 'success', 'object': pioneer}

@app.post('/disconnect')
def disconnect_handler(data: dict):
    pioneer = data['object']
    pioneer.disconnect()

@app.post('/motorOn')
def motorTurnOn(data: dict):
    print(data)
    # pioneer = data['object']
    # pioneer.arm()
    # pioneer.takeoff()