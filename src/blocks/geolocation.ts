/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";

const enableGeolocation = {
  type: "enableGeolocation",
  tooltip: "",
  helpUrl: "",
  message0: "Enable Geolocation",
  colour: 225,
};
const getLatitude = {
  type: "getLatitude",
  message0: "Get Latitude",
  colour: 160,
  output: "Number",
  tooltip: "",
  helpUrl: "",
};

const getLongitude = {
  type: "getLongitude",
  message0: "Get Longitude",
  colour: 160,
  output: "Number",
  tooltip: "",
  helpUrl: "",
};
// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const geolocationBlocks =
  Blockly.common.createBlockDefinitionsFromJsonArray([
    enableGeolocation,
    getLatitude,
    getLongitude,
  ]);
