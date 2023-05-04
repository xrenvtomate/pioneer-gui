from pioneer_sdk import Pioneer

drones = {}
drones_to_connect = set()

def add_drone(ip):
    drones[ip] = Pioneer(ip=ip)

def add_drones():
    drones = {ip: Pioneer(ip=ip) for ip in drones_to_connect}