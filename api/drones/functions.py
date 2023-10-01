from .connection import drones

def motor_on(pioneer):
    pioneer.arm()

def takeoff_all():
    for drone in drones.values():
        drone.arm()
        drone.takeoff()

def motor_off(pioneer):
    pioneer.disarm()

i = 0

def get_drone_state(ip):
    global i
    i += 1
    return {'info': f'idk {i}'}


x = y = 0 


def get_coordinates():
    global x, y
    x += 10
    y += 20
    x %= 300
    y %= 300
    return {'x': x, 'y': y}
