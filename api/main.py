from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pioneer_sdk import Pioneer
from utils.wifis import wifi_list, connect
from drones.connection import drones, add_drone, drones_to_connect
from drones.funtions import motor_on

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/list")
def list_wifis():
    return wifi_list()


@app.post('/connect_host')
def connect_host(data: dict):
    ssid = data['ssid']
    connect(ssid)
    pioneer = Pioneer()
    return {'res': 'success', 'object': 'pioneer'}


app.post('/connect_client')
def connect_client(data: dict):
    ssid = data['ssid']
    drones_to_connect.add(ssid)


@app.post('/disconnect')
def disconnect_handler(data: dict):
    pioneer = data['object']
    pioneer.disconnect()

@app.post('/motorOn')
def motorTurnOn(data: dict):
    for drone in drones.items():
        motor_on(drone)
    # pioneer = data['object']
    # pioneer.arm()
    # pioneer.takeoff()

