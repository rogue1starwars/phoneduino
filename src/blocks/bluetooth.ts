/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";
const connect = {
  type: "connect",
  tooltip: "",
  helpUrl: "",
  message0: "",
  colour: 225,
};
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
}; // Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const bluetoothBlocks =
  Blockly.common.createBlockDefinitionsFromJsonArray([connect, write]);
