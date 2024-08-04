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
const math_abs = {
  type: "math_abs",
  message0: "abs %1",
  args0: [
    {
      type: "input_value",
      name: "value",
      check: "Number",
    },
  ],
  output: "Number",
  colour: 230,
  tooltip: "",
  helpUrl: "",
};
// This does not register their definitions with Blockly.
// This file has no side effects!
export const mathBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  math_abs,
]);
