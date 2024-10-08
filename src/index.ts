/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly";
import { forBlock } from "./generators/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { save, saveFile, load, loadFile } from "./serialization";
import { toolbox } from "./toolbox";
import { handleTabs } from "./lib/handleTabs";
import { initialDeviceInfo } from "./lib/bluetooth/initialDeviceInfo";
import { handleConnect } from "./lib/bluetooth/handleConnect";
import { defineBlocks } from "./lib/defineBlocks";
import { clearAllIntervals } from "./lib/clearAllIntervals";
import { undo, redo } from "./lib/undoRedo";
import playButtonSrc from "./assets/playButton.png";
import pauseButtonSrc from "./assets/pause.png";
import { theme } from "./lib/theme";
import "./index.css";

// Set up initial event listeners
handleTabs();
const deviceInfo = initialDeviceInfo;
handleConnect(deviceInfo);

// Set up initial state
let isRunning = false;
let intervalIds: number[] = [];

// Register the blocks and generator with Blockly
defineBlocks();
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById("javascript")?.firstChild;
const outputDiv = document.getElementById("output");
const blocklyDiv = document.getElementById("blocklyDiv");
const runButton = document.getElementById("run") as HTMLButtonElement;
const runStopImg = document.getElementById("runStopImg") as HTMLImageElement;

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}

const ws = Blockly.inject(blocklyDiv, {
  toolbox: toolbox,
  theme: theme,
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

// add event listeners to save and load once ws is defined
loadFile(ws as Blockly.Workspace);
saveFile(ws as Blockly.Workspace);

undo(ws as Blockly.Workspace);
redo(ws as Blockly.Workspace);

const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws as Blockly.Workspace);
  if (codeDiv) codeDiv.textContent = code;

  if (outputDiv) outputDiv.innerHTML = "";

  const func = new Function(" deviceInfo, outputDiv, intervalIds", code);
  func(deviceInfo, outputDiv, intervalIds);
  runStopImg.src = pauseButtonSrc;
  isRunning = true;
};

const stopCode = () => {
  intervalIds = clearAllIntervals(intervalIds);
  runStopImg.src = playButtonSrc;
  isRunning = false;
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runButton.addEventListener("click", () => {
    if (isRunning) {
      stopCode();
    } else {
      runCode();
    }
  });

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener(() => {
    stopCode();
  });
}
