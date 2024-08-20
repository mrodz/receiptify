import { Button, Typography } from "@mui/material";
import React from "react";
import Webcam from "react-webcam";

function Camera() {
  const webcamRef = React.useRef<Webcam>(null);
  const [facingMode, setFacingMode] = React.useState<string>("user");
  const [permissionsGranted, setPermissionsGranted] = React.useState<boolean>(true);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null); // b64 string from .getScreenshot()

  navigator.permissions.query({ name: "camera" }).then((status) => {
    setPermissionsGranted(status.state === "granted");
  });

  function takePhoto() {
    const image: string = webcamRef.current!.getScreenshot()!;
    // this is nullable but to my understanding that only occurs when permissions aren't granted or there isn't a camera

    setPreviewImage(image)
  }

  function flipCamera() {
    if (facingMode === "user") {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  }

  function uploadImage() {


    setPreviewImage(null)
  }

  if (!previewImage) {
    return (
      <>
        {permissionsGranted && (
          <>
            <Webcam
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode }}
              ref={webcamRef}
            ></Webcam>
            <Button disabled={!permissionsGranted} onClick={takePhoto}>
              Take Photo
            </Button>
            <Button disabled={!permissionsGranted} onClick={flipCamera}>
              Flip Camera
            </Button>
          </>
        )}
        {!permissionsGranted && (
          <Typography>Camera permissions are required.</Typography>
        )}
      </>
    );
  } else {
    return (
      <>
        <img src={previewImage}></img>
        <Button onClick={uploadImage}>Upload</Button>
        <Button onClick={() => setPreviewImage(null)}>Retake/Cancel</Button>
      </>
    );
  }
}

export default Camera;
