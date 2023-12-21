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
    return [{'y': p.get_local_position_lps()[1], 'x': p.get_local_position_lps(get_last_received=True)[0]} for p in drones.values()]


def get_drone_state(ip):
    p = drones[ip]
    state = {}
    xyz = p.get_local_position_lps()
    if xyz is None:
        xyz = p.get_local_position_lps(get_last_received=True)
    state['x'] = f'{xyz[0]:.2f}'
    state['y'] = f'{xyz[1]:.2f}'
    state['z'] = f'{xyz[2]:.2f}'
    state['autopilot_state'] = p.get_autopilot_state()
    state['height'] = 123
    state['battery'] = 123
    
    print(state)
    return state
    
