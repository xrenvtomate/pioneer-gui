from pioneer_sdk import Pioneer
from utils.wifis import connect_drone_to_wifi
import time


drones = {}


def add_drone(ip):
    drones[ip] = Pioneer(ip=ip)
    print(drones[ip].get_battery_status())
    drones[ip].arm()
    
    time.sleep(1)
    print(drones[ip].get_battery_status())
    drones[ip].disarm()


async def add_drones(host_ssid, drones, websocket):
    for drone in drones:
        ip = await connect_drone_to_wifi(drone, host_ssid, websocket)
        if ip:
            print(ip)
            add_drone(ip)
