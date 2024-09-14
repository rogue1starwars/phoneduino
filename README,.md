# PhoneDuino

## What is PhoneDuino??

PhoneDuino is an smartphone application for IoT projects. Nowadays, smartphones contain a massive amount of high sensitive sensors. The concept of PhoneDuino is to take advantage of all the sensors in a smartphone when creating an IoT project.

PhoneDuino is currently available as a web application. [Visit application](https://phoneduino.rogue1starwars.com)

## Usage

PhoneDuino allows users to get sensor data from a phone, manipulate them, and send them to a microcomputer. To do this, we used "Blockly", which is a visual programming framework to allow users to create their custom scripts to get data, process them and send them.

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
