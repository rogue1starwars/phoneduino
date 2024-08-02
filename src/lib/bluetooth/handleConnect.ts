import { connect } from "./bluetooth";
import { deviceInfo } from "../types";

export const handleConnect = (deviceInfo: deviceInfo) => {
  console.log("trying to connect");
  let connectButton = document.getElementById("connect");

  connectButton &&
    connectButton.addEventListener("click", async () => {
      const connection = await connect({ deviceInfo });
      if (connection) {
        const { device, characteristic } = connection;
        deviceInfo.bluetoothDevice = device;
        deviceInfo.dataCharacteristic = characteristic;
      }
    });
};
