from pioneer_sdk import Pioneer
from utils.wifis import connect_drone_to_wifi
import time

drones = {}
drones_to_connect = set()

def add_drone(ip):
    drones[ip] = Pioneer(ip=ip)
    drones[ip].arm()
    time.sleep(1)
    drones[ip].disarm()

def add_drones(host_ssid):
    for drone in drones_to_connect:
        ip = connect_drone_to_wifi(drone, host_ssid)
        if ip:
            print(ip)
            add_drone(ip)


i = 0


def get_drone_state():
    global i
    i += 1
    return {'info': f'idk {i}'}
