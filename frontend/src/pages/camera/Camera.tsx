import { Button, Typography } from "@mui/material";
import React from "react";
import Webcam from "react-webcam";

function Camera() {
    const webcamRef = React.useRef<Webcam>(null)
    const [facingMode, setFacingMode] = React.useState<string>("user")
    const [permissionsGranted, setPermissionsGranted] = React.useState<boolean>(true)

    function takePhoto() {
        const image = webcamRef.current!.getScreenshot()!
        // this is nullable but to my understanding that only occurs when permissions aren't granted or there isn't a camera

        // Need function/route
    }
    
    navigator.permissions.query( { name: "camera" } ).then(status => {
        setPermissionsGranted(status.state === "granted")
    });

    function flipCamera() {
        if (facingMode === "user") {
            setFacingMode("environment")
        } else {
            setFacingMode("user")
        }
    }

  return (
    <>
        {permissionsGranted &&
            <Webcam screenshotFormat="image/jpeg" videoConstraints={{facingMode}} ref={webcamRef}></Webcam>
        }
        {!permissionsGranted &&
            <Typography>Camera permissions are required.</Typography>
        }
        <Button disabled={!permissionsGranted} onClick={takePhoto}>Take Photo</Button>
        <Button disabled={!permissionsGranted} onClick={flipCamera}>Flip Camera</Button>
    </>
  );
}

export default Camera;
