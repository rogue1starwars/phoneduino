/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";
const write = {
  type: "write",
  tooltip: "",
  helpUrl: "",
  message0: "write to device %1",
  args0: [
    {
      type: "input_value",
      name: "NAME",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 225,
};

const changeUUID = {
  type: "changeuuid",
  message0: "Change UUID %1 %2",
  args0: [
    {
      type: "input_value",
      name: "serviceUUID",
      check: "String",
    },
    {
      type: "input_value",
      name: "charUUID",
      check: "String",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: "",
  helpUrl: "",
}; // Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const bluetoothBlocks =
  Blockly.common.createBlockDefinitionsFromJsonArray([write, changeUUID]);
