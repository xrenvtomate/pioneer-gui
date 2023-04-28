import pywifi

profile = pywifi.Profile()
profile.ssid = 'Zlata' #ssid сети
profile.auth = pywifi.const.AUTH_ALG_OPEN #алгоритм аутентификации сети
profile.akm.append(pywifi.const.AKM_TYPE_WPA2PSK) #тип кей-менеджмента сети
profile.cipher = pywifi.const.CIPHER_TYPE_CCMP #тип шифрования сети
profile.key = 'pmnc3512' #пароль сети

wifi = pywifi.PyWiFi()
iface = wifi.interfaces()[0]
profile = iface.add_network_profile(profile)
iface.connect(profile)