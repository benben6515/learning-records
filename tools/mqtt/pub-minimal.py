import json
import time

import paho.mqtt.client as mqtt
from paho.mqtt.enums import CallbackAPIVersion

TOPIC_TEMP = "demo/sensor/temp"
TOPIC_STATUS = "demo/sensor/status"

client = mqtt.Client(
    callback_api_version=CallbackAPIVersion.VERSION2,  # paho 2.x required
    client_id="pub-minimal",
)
# LWT: broker publishes "offline" if we die without disconnect
client.will_set(TOPIC_STATUS, "offline", qos=1, retain=True)
client.connect("localhost", 1883, keepalive=30)
client.loop_start()

client.publish(TOPIC_STATUS, "online", qos=1, retain=True)

temp = 20.0
try:
    while True:
        temp += 0.1
        payload = json.dumps({"temp": round(temp, 1), "unit": "C"})
        info = client.publish(TOPIC_TEMP, payload, qos=1, retain=True)
        info.wait_for_publish()  # wait for PUBACK (teaching only)
        print(f"published: {payload}")
        time.sleep(2)
except KeyboardInterrupt:
    # clean shutdown: say goodbye ourselves, LWT not triggered
    client.publish(TOPIC_STATUS, "offline", qos=1, retain=True)
    client.loop_stop()
    client.disconnect()
