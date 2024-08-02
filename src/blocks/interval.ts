/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const interval = {
  type: "interval",
  tooltip: "",
  helpUrl: "",
  message0: "interval %1 %2",
  args0: [
    {
      type: "field_number",
      name: "time",
      value: 0,
    },
    {
      type: "input_statement",
      name: "function",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 225,
};
// This does not register their definitions with Blockly.
// This file has no side effects!
export const intervalBlocks =
  Blockly.common.createBlockDefinitionsFromJsonArray([interval]);
