import subprocess
import os
import requests


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

def check_connection(ssid):
    output = subprocess.check_output(['netsh', 'wlan', 'show', 'interfaces']).decode('cp1252', errors='replace')
    print(output)
    if ssid in output:
        return True
    return False

def get_password(ssid):
    output = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', 'bebra123', 'key=clear']).decode('cp1252', errors='ignore')
    return output.split('\n')[-12].split()[-1]


def connect_drone_to_wifi(drone_ssid, ssid):
    create_profile(drone_ssid, '12345678')
    connect(drone_ssid)
    password = get_password(ssid)

    response = requests.post('http://192.168.4.1/', params={
        'function': 'wifi',
        'command': 'connect',
        'ssid': ssid,
        'password': password
    }).json()
    if response['success'] != 'true':
        return False
    return '.'.join(response['wifi_sta_ip'])
