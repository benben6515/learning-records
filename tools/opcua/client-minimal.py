import asyncio
from asyncua import Client

url = "opc.tcp://localhost:4840/freeopcua/server/"
ns = "http://examples.freeopcua.github.io"


class Handler:
    def datachange_notification(self, node, val, data):
        print(f"datachange: {node} = {val}")


async def main():
    async with Client(url=url) as client:
        idx = await client.get_namespace_index(ns)

        var = await client.nodes.root.get_child(
            f"0:Objects/{idx}:MyObject/{idx}:MyVariable"
        )
        print("read:", await var.read_value())

        await var.write_value(42.0)  # server var is Float, int raises BadTypeMismatch
        print("after write:", await var.read_value())

        res = await client.nodes.objects.call_method(f"{idx}:ServerMethod", 5)
        print("method call ServerMethod(5) =", res)

        # subscription: watch server's +0.1/s updates
        sub = await client.create_subscription(100, Handler())
        await sub.subscribe_data_change(var)
        await asyncio.sleep(5)
        await sub.delete()


asyncio.run(main())
