export type deviceInfo = {
  hashUUID: { serviceUUID: string; characteristicUUID: string };
  bluetoothDevice: any;
  dataCharacteristic: any;
  hashUUID_lastConnected: string;
};

declare global {
  interface Navigator {
    bluetooth: Bluetooth;
  }
}
