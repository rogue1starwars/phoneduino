import { connect } from "./bluetooth";
import { deviceInfo } from "../types";

export const handleConnect = (deviceInfo: deviceInfo) => {
  console.log("trying to connect");
  let connectButton = document.getElementById("connect") as HTMLButtonElement;

  connectButton &&
    connectButton.addEventListener("click", async () => {
      connectButton.style.border = "2px solid #6998ff";
      const connection = await connect({ deviceInfo });
      if (connection) {
        const { device, characteristic } = connection;
        deviceInfo.bluetoothDevice = device;
        deviceInfo.dataCharacteristic = characteristic;
        connectButton.style.backgroundColor = "#6998ff";
        connectButton.disabled = true;
      } else {
        connectButton.style.border = "none";
      }
    });
};
