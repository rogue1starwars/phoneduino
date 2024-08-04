import * as Blockly from "blockly/core";
export const undo = (ws: Blockly.Workspace) => {
  const undoButton = document.getElementById("undo") as HTMLButtonElement;
  undoButton.addEventListener("click", () => {
    ws.undo(false);
  });
};

export const redo = (ws: Blockly.Workspace) => {
  const redoButton = document.getElementById("redo") as HTMLButtonElement;
  redoButton.addEventListener("click", () => {
    ws.undo(true);
  });
};
