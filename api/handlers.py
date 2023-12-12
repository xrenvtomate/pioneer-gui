import json

from fastapi import APIRouter
from fastapi import FastAPI, Body, WebSocket
from pydantic import BaseModel
from utils.wifis import wifi_list, connect
from drones.connection import drones, add_drones
from schemas import DroneIp, GoTo
from drones import functions


router = APIRouter()


@router.get("/list/")
def list_wifis():
    return wifi_list()


@router.post('/save_host')
def save_host(data: dict):
    ssid = data['ssid']
    print(ssid)
    with open('saved_net.txt', 'w') as f:
        f.write(ssid)\


@router.post('/connect_saved')
def connect_remembered(data: dict):
    with open('saved_net.txt', 'r') as f:
        ssid = f.read()
    drones_to_connect = data['drones']
    add_drones(ssid, drones_to_connect)
    
    connect(ssid)
    if not drones:
        return {'res': 'error', 'drone_ip': None}
    return {'res': 'success', 'list': list(drones.keys())}


@router.get('/drone_coordinates/')
def get_coordinates():
    return functions.get_coordinates()



@router.post('/disconnect/')
def disconnect_handler(drone_ip: str = Body()):
    pioneer = drones[drone_ip]
    pioneer.disconnect()



@router.post('/motor_on/')
def motorTurnOn(drone_ip: DroneIp):
    print(drone_ip)
    functions.motor_on(drones[drone_ip.drone_ip])

@router.post('/motor_off/')
def motorTurnOn(drone_ip: DroneIp):
    print(drone_ip)
    functions.motor_off(drones[drone_ip.drone_ip])

@router.post('/takeoff_all/')
def takeoff_all():
    functions.takeoff_all()

@router.post('/land/')
def disconnect_handler(drone_ip: DroneIp):
    pioneer = drones[drone_ip.drone_ip]
    pioneer.land()

@router.post('/goto')
def go_to_point(drone: DroneIp, coords: GoTo):
    pioneer = drones[drone.drone_ip]
    pioneer.go_to_local_point(x=coords.x, y=coords.y, z=coords.z)

@router.post('/takeoff')
def take_off(drone: DroneIp):
    pioneer = drones[drone.drone_ip]
    pioneer.arm()
    pioneer.takeoff()


@router.websocket('/ws')
async def ws(websocket: WebSocket):
    await websocket.accept()
    text_data = await websocket.receive_text()
    drones_to_connect = json.loads(text_data)['drones']

    with open('saved_net.txt', 'r') as f:
        ssid = f.read()

    await add_drones(ssid, drones_to_connect, websocket)
    await websocket.send_text('Подключение к хосту')
    connect(ssid)

    await websocket.close()


@router.get('/info')
async def get_info(drone_ip):
    return functions.get_drone_state(drone_ip)
