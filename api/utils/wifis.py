import subprocess
import os
import requests
import time


def wifi_list():
    output = subprocess.check_output(['netsh', 'wlan', 'show', 'network'])
    output = output.decode('cp1252', errors='replace')

    available_networks = []
    for line in output.split('\n'):
        if 'SSID' in line:
            ssid = line.split(':')[1].strip()
            available_networks.append(ssid)
    return available_networks


def create_profile(ssid, password):
    profile_name = ssid
    config = f"""<?xml version=\"1.0\"?>
<WLANProfile xmlns="http://www.microsoft.com/networking/WLAN/profile/v1">
    <name>{profile_name}</name>
    <SSIDConfig>
        <SSID>
            <name>{ssid}</name>
        </SSID>
    </SSIDConfig>
    <connectionType>ESS</connectionType>
    <connectionMode>auto</connectionMode>
    <MSM>
        <security>
            <authEncryption>
                <authentication>WPA2PSK</authentication>
                <encryption>AES</encryption>
                <useOneX>false</useOneX>
            </authEncryption>
            <sharedKey>
                <keyType>passPhrase</keyType>
                <protected>false</protected>
                <keyMaterial>{password}</keyMaterial>
            </sharedKey>
        </security>
    </MSM>
</WLANProfile>"""

    command = f"netsh wlan add profile filename=\"profiles\profile.xml\""
    with open("profiles\profile.xml", 'w') as file:
        file.write(config)
    os.system(command)


def connect(profile):
    command = f"netsh wlan connect name=\"{profile}\""
    os.system(command)
    time.sleep(5)
    print('Connected to wifi')

def check_connection(ssid):
    output = subprocess.check_output(['netsh', 'wlan', 'show', 'interfaces']).decode('cp1252', errors='replace')
    print(output)
    if ssid in output:
        return True
    return False

def get_password(ssid):
    output = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', ssid, 'key=clear']).decode('cp1252', errors='ignore')
    return output.split('\n')[-12].split()[-1]


async def connect_drone_to_wifi(drone_ssid, ssid, websocket):
    print('Trying to connect to the drone network')
    create_profile(drone_ssid, '12345678')
    await websocket.send_text(f'Начинается подключение к дрону')

    connect(drone_ssid)
    password = get_password(ssid)
    for i in range(1, 6):
        await websocket.send_text(f'Попытка {i} подключения к дрону')
        try:
            response = requests.get(f'http://192.168.4.1/control?function=wifi&command=connect&ssid={ssid.replace(" ", "%20")}&password={password}').json()
            if not response['wifi_sta_connected'] or response['wifi_sta_ip'] == [0, 0, 0, 0]:
                continue
            print('request successfully sent')
            break
        except Exception as e:
            print('sending request failed')
            print('\n')
            print(e)
            print('\n')
    else:
        return False
    print(response['wifi_sta_ip'])
    return '.'.join(map(str, response['wifi_sta_ip']))
