import { deviceInfo } from "../../lib/types";

export async function connect({ deviceInfo }: { deviceInfo: deviceInfo }) {
  //Checking if the device is already connected
  if (deviceInfo.bluetoothDevice === null) {
    try {
      console.log("scanning for devices");
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [deviceInfo.hashUUID.serviceUUID],
      });

      // Connecting to the GATT server
      console.log("connecting to gatt server");
      if (!device.gatt) {
        console.log("gatt server not found");
        return;
      }
      const server = await device.gatt.connect();
      console.log("Getting service");
      const service = await server.getPrimaryService(
        deviceInfo.hashUUID.serviceUUID,
      );
      console.log("Getting characteristic");
      const characteristic = await service.getCharacteristic(
        deviceInfo.hashUUID.characteristicUUID,
      );
      return { device, characteristic };
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("device already connected");
  }
}

export async function write({
  deviceInfo,
  data,
}: {
  deviceInfo: deviceInfo;
  data: string;
}) {
  if (deviceInfo.dataCharacteristic !== null) {
    try {
      console.log("writing data");
      await deviceInfo.dataCharacteristic.writeValue(
        new TextEncoder().encode(data),
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("device not connected");
  }
}
