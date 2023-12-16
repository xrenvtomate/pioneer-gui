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



def get_coordinates(drones):
    return [{'y': p.get_local_position_lps()[1], 'x': p.get_local_position_lps(get_last_received=True)[0]} for p in drones]


def get_drone_state(ip):
    p = drones[ip]
    state = {}
    state['xyz'] = p.get_local_position_lps()
    state['autopilot_state'] = p.get_autopilot_state()
    print(state)
    return state
    
