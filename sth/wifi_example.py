import wifi

# Список доступных сетей Wi-Fi
networks = wifi.Cell.all('wlan0')
print(networks)
# Подключение к сети
# for network in networks:
#     if network.ssid == 'название_сети':
#         scheme = wifi.Scheme.for_cell('wlan0', 'название_сети', network, 'пароль')
#         scheme.save()
#         scheme.activate()
#         break