import subprocess
import os


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

# print(check_connection('bebra123'))