import * as Blockly from "blockly";
import { geolocationBlocks } from "../blocks/geolocation";
import { textBlocks } from "../blocks/text";
import { intervalBlocks } from "../blocks/interval";
import { bluetoothBlocks } from "../blocks/bluetooth";
import { deviceOrientationBlocks } from "../blocks/deviceOrientation";
import { mathBlocks } from "../blocks/math";

export const defineBlocks = () => {
  Blockly.common.defineBlocks(geolocationBlocks);
  Blockly.common.defineBlocks(intervalBlocks);
  Blockly.common.defineBlocks(textBlocks);
  Blockly.common.defineBlocks(bluetoothBlocks);
  Blockly.common.defineBlocks(deviceOrientationBlocks);
  Blockly.common.defineBlocks(mathBlocks);
};
