/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly";
import { geolocationBlocks } from "./blocks/geolocation";
import { textBlocks } from "./blocks/text";
import { intervalBlocks } from "./blocks/interval";
import { bluetoothBlocks } from "./blocks/bluetooth";
import { forBlock } from "./generators/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { save, load } from "./serialization";
import { toolbox } from "./toolbox";

import { handleConnect } from "./lib/bluetooth/handleConnect";
import { write } from "./lib/bluetooth/bluetooth";
import "./index.css";

// Connect to the bluetooth device

const deviceInfo = {
  hashUUID: {
    serviceUUID: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
    characteristicUUID: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
  },
  bluetoothDevice: null,
  dataCharacteristic: null,
  hashUUID_lastConnected: "",
};
handleConnect(deviceInfo);
// Register the blocks and generator with Blockly

Blockly.common.defineBlocks(geolocationBlocks);
Blockly.common.defineBlocks(intervalBlocks);
Blockly.common.defineBlocks(textBlocks);
Blockly.common.defineBlocks(bluetoothBlocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById("generatedCode")?.firstChild;
const outputDiv = document.getElementById("output");
const blocklyDiv = document.getElementById("blocklyDiv");

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}
const ws = Blockly.inject(blocklyDiv, { toolbox });

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  // Initial declarations
  const write_to_device = write;
  let _latitude = 0;
  let _longitude = 0;
  const code = javascriptGenerator.workspaceToCode(ws as Blockly.Workspace);
  if (codeDiv) codeDiv.textContent = code;

  if (outputDiv) outputDiv.innerHTML = "";

  eval(code);
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });
}
