from fastapi import FastAPI, Body
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from utils.wifis import wifi_list, connect
from drones.connection import drones, add_drones, drones_to_connect
from schemas import DroneIP
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
    drones = data['drones']
    add_drones(ssid, drones)
    
    connect(ssid)
    if not drones:
        return {'res': 'error', 'drone_ip': None}
    return {'res': 'success', 'drone_ip': list(drones.keys())[0]}
    # return {'res': 'succeнеss', 'drone_ip': '12341234'}


@app.get('/drone_coordinates/')
def get_coordinates():
    return functions.get_coordinates()



@app.get('/get_state/')
def get_state(ip: str):
    return functions.get_drone_state(ip)


@app.post('/connect_client/')
def connect_client(data: dict):
    ssid = data['ssid']
    drones_to_connect.add(ssid)
    return {'res': 'success'}


@app.post('/disconnect/')
def disconnect_handler(drone_ip: str = Body()):
    pioneer = drones[drone_ip]
    pioneer.disconnect()


class DroneIp(BaseModel):
    drone_ip: str


@app.post('/motor_on/')
def motorTurnOn(drone_ip: DroneIp):
    print(drone_ip)
    functions.motor_on(drones[drone_ip.drone_ip])

@app.post('/motor_off/')
def motorTurnOn(drone_ip: DroneIp):
    print(drone_ip)
    functions.motor_off(drones[drone_ip.drone_ip])

@app.post('/takeoff_all/')
def takeoff_all():
    functions.takeoff_all()

@app.post('/land/')
def disconnect_handler(drone_ip: DroneIP):
    pioneer = drones[drone_ip.drone_ip]
    pioneer.land()
