import React, { Component } from "react";
import { Button} from 'semantic-ui-react'

export class CameraFeed extends Component {
  /**
   * Processes available devices and identifies one by the label
   * @memberof CameraFeed
   * @instance
   */
  processDevices(devices) {
    devices.forEach(device => {
      console.log(device.label);
      this.setDevice(device);
    });
  }

  /**
   * Sets the active device and starts playing the feed
   * @memberof CameraFeed
   * @instance
   */
  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId }
    });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  /**
   * On mount, grab the users connected devices and process them
   * @memberof CameraFeed
   * @instance
   * @override
   */
  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }
  /**
   * Handles taking a still image from the video feed on the camera
   * @memberof CameraFeed
   * @instance
   */
  takePhoto = () => {
    const { sendFile } = this.props;
    const context = this.canvas.getContext("2d");
    context.drawImage(this.videoPlayer, 0, 0, 300, 150);
    this.canvas.toBlob(sendFile);
  };

  render() {
    return (
      <div>
        <div>
          <video
            ref={ref => (this.videoPlayer = ref)}
            width="300"
            heigh="150"
          />
        </div>
        <Button circular icon='camera ' color='green' onClick={this.takePhoto}/>
        <div>
          <canvas width="300" height="150" ref={ref => (this.canvas = ref)} />
        </div>
      </div>
    );
  }
}
