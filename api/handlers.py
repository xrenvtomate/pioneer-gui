from fastapi import APIRouter
from fastapi import FastAPI, Body
from pydantic import BaseModel
from utils.wifis import wifi_list, connect
from drones.connection import drones, add_drones
from schemas import DroneIP, GoTo
from drones import functions


router = APIRouter()


@router.get("/list/")
def list_wifis():
    return wifi_list()


@router.post('/connect_host/')
def connect_host(data: dict):
    ssid = data['ssid']
    drones = data['drones']
    add_drones(ssid, drones)
    
    connect(ssid)
    if not drones:
        return {'res': 'error', 'drone_ip': None}
    return {'res': 'success', 'list': list(drones.keys())}


@router.get('/drone_coordinates/')
def get_coordinates():
    return functions.get_coordinates()



@router.get('/get_state/')
def get_state(ip: str):
    return functions.get_drone_state(ip)


@router.post('/disconnect/')
def disconnect_handler(drone_ip: str = Body()):
    pioneer = drones[drone_ip]
    pioneer.disconnect()


class DroneIp(BaseModel):
    drone_ip: str


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
def disconnect_handler(drone_ip: DroneIP):
    pioneer = drones[drone_ip.drone_ip]
    pioneer.land()

@router.post('/goto')
def go_to_point(drone: DroneIP, coords: GoTo):
    pioneer = drones[drone.drone_ip]
    pioneer.go_to_local_point(x=coords.x, y=coords.y, z=coords.z)

@router.post('takeoff')
def take_off(drone: DroneIP):
    pioneer = drones[drone.drone_ip]
    pioneer.arm()
    pioneer.take_off()