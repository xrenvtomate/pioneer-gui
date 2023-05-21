from .connection import drones

def motor_on(pioneer):
    pioneer.arm()

def takeoff_all():
    for drone in drones.values():
        drone.arm()
        drone.takeoff()

i = 0

def get_drone_state():
    global i
    i += 1
    return {'info': f'idk {i}'}