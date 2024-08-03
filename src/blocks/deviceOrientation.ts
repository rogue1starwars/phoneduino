/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";
const enableDeviceOrientation = {
  type: "enableDeviceOrientation",
  tooltip: "",
  helpUrl: "",
  message0: "Enable device orientation",
  colour: 225,
};

const getAlpha = {
  type: "getAlpha",
  message0: "Get Alpha",
  colour: 160,
  output: "Number",
  tooltip: "",
  helpUrl: "",
};
const getBeta = {
  type: "getBeta",
  message0: "Get Beta",
  colour: 160,
  output: "Number",
  tooltip: "",
  helpUrl: "",
};
const getGamma = {
  type: "getGamma",
  message0: "Get Gamma",
  colour: 160,
  output: "Number",
  tooltip: "",
  helpUrl: "",
};
// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const deviceOrientationBlocks =
  Blockly.common.createBlockDefinitionsFromJsonArray([
    enableDeviceOrientation,
    getAlpha,
    getBeta,
    getGamma,
  ]);
