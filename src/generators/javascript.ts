/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from "blockly/javascript";
import * as Blockly from "blockly/core";

import { write } from "../lib/bluetooth/bluetooth";

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock["enableGeolocation"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
  // Generate the function call for this block.
) {
  const code = `if (typeof _latitude == "undfined" || typeof _longitude == "undefined") {
  } else {
    window.navigator.geolocation.getCurrentPosition((position) => {
      _latitude = position.coords.latitude;
      _longitude = position.coords.longitude;
    });
  }`;

  return code;
};

forBlock["getLatitude"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  return [`_latitude`, Order.ATOMIC];
};

forBlock["getLongitude"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  return [`_longitude`, Order.ATOMIC];
};

forBlock["add_text"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const text: string = generator.valueToCode(block, "TEXT", Order.ATOMIC);
  if (text == "") {
    return "// No text provided\n";
  }
  const code = `
const lines = outputDiv.innerHTML.split('<br>');
if (lines.length > 10) {
  lines.pop();
  outputDiv.innerHTML = lines.join('<br>');
}
console.log(lines.length);
outputDiv.innerHTML = ${text} + '<br>' + outputDiv.innerHTML;`;
  return code;
};

forBlock["interval"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const number_time = block.getFieldValue("time");
  const statement_function = generator.statementToCode(block, "function");

  // TODO: Assemble javascript into the code variable.
  const code = `
  intervalIds.push(setInterval(() => {${statement_function}}, ${number_time}));
  `;
  return code;
};
// forBlock["connect"] = function (
//   block: Blockly.Block,
//   generator: Blockly.CodeGenerator,
// ) {
//   const code = `
//   const deviceInfo = {
//     hashUUID: {
//       serviceUUID: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
//       characteristicUUID: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
//     },
//     bluetoothDevice: null,
//     dataCharacteristic: null,
//     hashUUID_lastConnected: "",
//   };
//
//   async function connect({ deviceInfo }) {
//     //Checking if the device is already connected
//     if (deviceInfo.bluetoothDevice === null) {
//       try {
//         console.log("scanning for devices");
//         const device = await navigator.bluetooth.requestDevice({
//           acceptAllDevices: true,
//           optionalServices: [deviceInfo.hashUUID.serviceUUID],
//         });
//
//         // Connecting to the GATT server
//         console.log("connecting to gatt server");
//         if (device.gatt) {
//           console.log("gatt server not found");
//           return;
//         }
//         const server = await device.gatt.connect();
//         console.log("Getting service");
//         const service = await server.getPrimaryService(
//           deviceInfo.hashUUID.serviceUUID,
//         );
//         console.log("Getting characteristic");
//         const characteristic = await service.getCharacteristic(
//           deviceInfo.hashUUID.characteristicUUID,
//         );
//         return { device, characteristic };
//       } catch (e) {
//         console.log(e);
//       }
//     } else {
//       console.log("device already connected");
//     }
//   }
// `;
//   return code;
// };
forBlock["write"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const data = generator.valueToCode(block, "NAME", Order.ATOMIC);

  // TODO: Assemble javascript into the code variable.

  const code = `write_to_device({deviceInfo: deviceInfo, data: ${data}});`;
  return code;
};

forBlock["enableDeviceOrientation"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const code = `window.addEventListener("deviceorientation", (event) => {
  deviceOrientation.alpha = event.alpha;
  deviceOrientation.beta = event.beta;
  deviceOrientation.gamma = event.gamma;
});`;
  return code;
};

forBlock["getAlpha"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  return [`deviceOrientation.alpha`, Order.ATOMIC];
};

forBlock["getBeta"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  return [`deviceOrientation.beta`, Order.ATOMIC];
};

forBlock["getGamma"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  return [`deviceOrientation.gamma`, Order.ATOMIC];
};
