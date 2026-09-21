import paho.mqtt.client as mqtt
from paho.mqtt.enums import CallbackAPIVersion


def on_connect(client, userdata, flags, reason_code, properties):
    print("connected:", reason_code)
    client.subscribe("demo/#", qos=1)


def on_message(client, userdata, message):
    # retained=True means broker replayed an old retained message
    flag = " [retained]" if message.retained else ""
    print(f"{message.topic} (qos={message.qos}){flag}: {message.payload.decode()}")


client = mqtt.Client(
    callback_api_version=CallbackAPIVersion.VERSION2,  # paho 2.x required
    client_id="sub-minimal",
)
client.on_connect = on_connect  # set callbacks BEFORE connect
client.on_message = on_message
client.connect("localhost", 1883, keepalive=30)
client.loop_forever()
