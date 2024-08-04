/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from "blockly/javascript";
import * as Blockly from "blockly/core";

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock["enableGeolocation"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
  // Generate the function call for this block.
) {
  const code = `
  let _latitude = 0;
  let _longitude = 0;
  window.navigator.geolocation.getCurrentPosition((position) => {
    _latitude = position.coords.latitude;
    _longitude = position.coords.longitude;
  });
  `;

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
outputDiv.innerHTML = ${text} + '<br>' + outputDiv.innerHTML;`;
  return code;
};

forBlock["interval"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const number_time = block.getFieldValue("time");
  const statement_function = generator.statementToCode(block, "function");
  const code = `
  intervalIds.push(setInterval(() => {${statement_function}}, ${number_time}));
  `;
  return code;
};
forBlock["write"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const data = generator.valueToCode(block, "NAME", Order.ATOMIC);
  const code = `
   async function write({
    deviceInfo,
    data,
  }) {
    if (deviceInfo.dataCharacteristic !== null) {
      try {
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
  write({deviceInfo: deviceInfo, data: ${data}});`;
  return code;
};

forBlock["changeuuid"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  var value_serviceuuid = generator.valueToCode(
    block,
    "serviceUUID",
    Order.ATOMIC,
  );
  var value_charuuid = generator.valueToCode(block, "charUUID", Order.ATOMIC);
  var code = `
  deviceInfo.hashUUID.serviceUUID = ${value_serviceuuid};
  deviceInfo.hashUUID.characteristicUUID = ${value_charuuid};
  \n`;
  return code;
};

forBlock["enableDeviceOrientation"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const code = `
  const deviceOrientation = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  };
  window.addEventListener("deviceorientationabsolute", (event) => {
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
  return [`360-deviceOrientation.alpha`, Order.ATOMIC];
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

forBlock["math_abs"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  var value_value = generator.valueToCode(block, "value", Order.ATOMIC);
  var code = `Math.abs(${value_value})`;
  return [code, Order.ATOMIC];
};
