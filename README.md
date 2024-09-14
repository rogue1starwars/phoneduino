# PhoneDuino

## What is PhoneDuino??

PhoneDuino is a smartphone application designed for IoT projects. Creating IoT devices on your own using microcomputers, motors, and sensors requires a lot of hard work, such as circuit designing, solder-mounting, and programming. To make this process easier and more enjoyable, we created a tool to use a smartphone as a microcomputer. Modern smartphones contain a large number of highly sensitive sensors. The concept of PhoneDuino is to use a smartphone as a microcomputer, and leverage these sensors when building IoT projects.

## OVERVIEW

PhoneDuino uses Blockly to allow users to write scripts. Modern microcomputers, such as Arduino, enable users to write C++ code for control. However, learning a new programming language can be overwhelming, which is why we decided to use visual programming for data processing. PhoneDuino also leverages various browser APIs to collect sensor data built into smartphones. Users can easily retrieve this data with a single command, without the need for complex libraries like those used in traditional microcomputers.

One of the main challenges with using smartphones as microcomputers is the lack of GPIO pins, which means they can't directly control motors or light up LEDs. To solve this problem, PhoneDuino allows smartphones to connect with microcomputers via BLE (Bluetooth Low Energy) and send commands between them. With this feature, users can retrieve sensor data from phones, process it, and based on the results, send commands to the microcomputer to control motors or light up LEDs.

## TECHNOLOGY

PhoneDuino is built on top of the boiler template of Blockly. [See more about creating a blockly project](https://developers.google.com/blockly/guides/get-started/get-the-code). It uses regular HTML, CSS, and Typescript, and is built by webpack.

## Usage

PhoneDuino allows users to retrieve sensor data from a phone, manipulate it, and send it to a microcomputer. To achieve this, we used 'Blockly,' a visual programming framework that enables users to create custom scripts to retrieve, process, and transmit the data.

PhoneDuino is currently available as a web application. [Visit application](https://phoneduino.rogue1starwars.com)

[Learn more about Blockly](https://developers.google.com/blockly)

### Connect to a microcomputer

PhoneDuino allows phones to send sensor data to a micro computer using BLE (Bluetooth Low Energy). To connect to a device, tap the Bluetooth button on the top nav bar, and select the device you want to connect to.

In order to send data through BLE, use the "write to device" block in the bluetooth section and put the data you want to send as a parameter.

Here is the Javascript code that runs whenever the data is sent.

```javascript
 async function write({
    deviceInfo,
    data,
  }) {
    if (deviceInfo.dataCharacteristic !== null) {
      try {
        await deviceInfo.dataCharacteristic.writeValue(
          new TextEncoder().encode(data),
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("device not connected");
    }
  }
  write({deviceInfo: deviceInfo, data: ${data}});
```

### Get sensor data

The current version of Phoneduino allows users to obtain the following sensor data in a smartphone.

- GPS sensor
- Device Orientation

To use the GPS sensor, first enable Geolocation with the "Enable Geolocation" block in the geolocation section. When obtaining the actual latitude and longitude, use the "Get Latitude (Longitude)" block.

Enable Geolocation source code

```javascript
let _latitude = 0;
let _longitude = 0;
window.navigator.geolocation.getCurrentPosition((position) => {
  _latitude = position.coords.latitude;
  _longitude = position.coords.longitude;
});
```

Get Latitude source code

```javascript
return _latitude;
```

To use the device orientation sensor, like the geolocation sensor first enable device orientaiton with the "Enable device orientation" block in the orientation section. When retrieving the actual values, use the "Get Alpha (Beta, Gamma)" block.

Enable Device Orientation source code

```javascript
const deviceOrientation = {
  alpha: 0,
  beta: 0,
  gamma: 0,
};
window.addEventListener("deviceorientationabsolute", (event) => {
  deviceOrientation.alpha = event.alpha;
  deviceOrientation.beta = event.beta;
  deviceOrientation.gamma = event.gamma;
});
```

Get Alpha source code

```javascript
return deviceOrientation.alpha;
```

### Run code

Press the start button on the top nav bar to actually start the script that you made in blockly. You can stop the code by pressing it again.

### See logs

You can print out logs by using the "Add Text" block in the Text section. To take a look at the logs, press the terminal icon button on the top nav bar. A cream-colored window will appear, and all the logs you have print out will show up.

### See source code

When the blockly code is running, it is actually running a javascript code that is auto-generated based on the scripts that you made. To take a look at the javascript code that is actually running, press the JS icon button on the top nav bar. A cream-colored window will appear, and all the source code will show up.

### Save work space

All work spaces are auto-saved on the device's local storage. You can retrieve them whenever you open up PhoneDuino again, unless you delete all chached data.

### Share work space

You can export and import workspaces via json file. To download your workspace, press the download icon button on the top nav bar. To upload an existing workspace, tap the upload icon button on the nav bar.
