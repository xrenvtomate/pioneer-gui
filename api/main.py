from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.wifis import wifi_list, connect
from drones.connection import drones, add_drones, drones_to_connect
from drones import functions
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


@app.post('/connect_host/')
def connect_host(data: dict):
    ssid = data['ssid']
    add_drones(ssid)
    connect(ssid)
    if not drones:
        return {'res': 'error', 'drone_ip': None}
    return {'res': 'success', 'drone_ip': list(drones.keys())[0]}
    # return {'res': 'success', 'drone_ip': '12341234'}


@app.post('/connect_client/')
def connect_client(data: dict):
    ssid = data['ssid']
    print(drones_to_connect)
    drones_to_connect.add(ssid)
    print(drones_to_connect)
    return {'res': 'success'}


@app.post('/disconnect/')
def disconnect_handler(data: dict):
    pioneer = drones[data['drone_ip']]
    pioneer.disconnect()

@app.post('/motor_on/')
def motorTurnOn(data: dict):
    functions.motor_on(drones[data['drone_ip']])

@app.post('/takeoff_all/')
def disconnect_handler():
    functions.takeoff_all()
