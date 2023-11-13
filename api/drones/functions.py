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
x = y = 0 



def get_coordinates():
    global x, y
    x += 10
    y += 20
    x %= 300
    y %= 300
    return {'x': x, 'y': y}

def get_drone_state(ip):
    p = drones[ip]
    state = {}
    state['xyz'] = p.get_local_position_lps()
    state['autopilot_state'] = p.get_autopilot_state()
    print(state)
    return state
    
