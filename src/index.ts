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
import { deviceOrientationBlocks } from "./blocks/deviceOrientation";
import { forBlock } from "./generators/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { save, saveFile, load, loadFile } from "./serialization";
import { toolbox } from "./toolbox";

import { handleConnect } from "./lib/bluetooth/handleConnect";
import { write } from "./lib/bluetooth/bluetooth";
import "./index.css";

// Connect to the bluetooth device
const handleSaveFile = function () {
  if (!ws) return;
  saveFile(ws as Blockly.Workspace);
};
(window as any).handleSaveFile = handleSaveFile;

const handleLoadFile = function () {
  const fileInput = document.getElementById("fileInput") as HTMLInputElement;
  if (!ws || !fileInput) return;
  loadFile(ws as Blockly.Workspace, fileInput);
};
(window as any).handleLoadFile = handleLoadFile;

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
Blockly.common.defineBlocks(deviceOrientationBlocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById("generatedCode")?.firstChild;
const outputDiv = document.getElementById("output");
const blocklyDiv = document.getElementById("blocklyDiv");

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}

function handleCheck(element: HTMLElement, divId: string) {
  const tab = document.getElementById(divId);
  if (tab) {
    if (tab.style.display === "block") {
      element.style.backgroundColor = "#ededed";
      element.style.color = "#000";
      tab.style.display = "none";
    } else {
      element.style.backgroundColor = "#6998ff";
      element.style.color = "#fff";
      tab.style.display = "block";
    }
  }
}

(window as any).handleClick = handleCheck;

const ws = Blockly.inject(blocklyDiv, {
  toolbox: toolbox,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  trashcan: true,
});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
// Array to keep track of interval IDs
let intervalIds: number[] = [];
const runCode = () => {
  // Initial declarations
  const write_to_device = write;
  let _latitude = 0;
  let _longitude = 0;
  let deviceOrientation = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  };
  // Function to clear all intervals
  function clearAllIntervals() {
    for (let id of intervalIds) {
      clearInterval(id);
    }
    // Clear the array after clearing all intervals
    intervalIds = [];
  }
  clearAllIntervals();
  outputDiv?.innerHTML;
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
