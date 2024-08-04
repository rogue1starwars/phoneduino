/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";

const storageKey = "mainWorkspace";

/**
 * Saves the state of the workspace to browser's local storage.
 * @param workspace Blockly workspace to save.
 */
export const save = function (workspace: Blockly.Workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

export const saveFile = function (workspace: Blockly.Workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "workspace.json";
  anchor.click();
};
/**
 * Loads saved state from local storage into the given workspace.
 * @param workspace Blockly workspace to load into.
 */
export const loadFile = function (
  workspace: Blockly.Workspace,
  fileInput: HTMLInputElement,
) {
  const file = (fileInput as HTMLInputElement).files?.[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      const data = reader.result;
      Blockly.Events.disable();
      Blockly.serialization.workspaces.load(
        JSON.parse(data as string),
        workspace,
        undefined,
      );
      Blockly.Events.enable();
    },
    false,
  );

  if (file) {
    reader.readAsText(file);
  }
};

export const load = function (workspace: Blockly.Workspace) {
  const data = window.localStorage?.getItem(storageKey);
  if (!data) return;

  // Don't emit events during loading.
  Blockly.Events.disable();
  Blockly.serialization.workspaces.load(JSON.parse(data), workspace, undefined);
  Blockly.Events.enable();
};
