import asyncio
from asyncua import Server, ua
from asyncua.common.methods import uamethod


@uamethod
def func(parent, value):
    return value * 2


async def main():
    server = Server()
    await server.init()
    server.set_endpoint("opc.tcp://0.0.0.0:4840/freeopcua/server/")

    idx = await server.register_namespace("http://examples.freeopcua.github.io")

    myobj = await server.nodes.objects.add_object(idx, "MyObject")
    myvar = await myobj.add_variable(idx, "MyVariable", 6.7)
    await myvar.set_writable()

    await server.nodes.objects.add_method(
        ua.NodeId("ServerMethod", idx),
        ua.QualifiedName("ServerMethod", idx),
        func,
        [ua.VariantType.Int64],
        [ua.VariantType.Int64],
    )

    async with server:
        print("server running on opc.tcp://0.0.0.0:4840/freeopcua/server/")
        while True:
            await asyncio.sleep(1)
            await myvar.write_value(round(await myvar.get_value() + 0.1, 1))


asyncio.run(main())
