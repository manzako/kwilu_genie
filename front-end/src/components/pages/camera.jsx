import React from "react";
import Webcam from "react-webcam";
import { Button} from 'semantic-ui-react'

const Camera = (props) => {
    const webcamRef = React.useRef(null);
     const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      console.log("capture ===> "+imageSrc)
      envoiPhoto(imageSrc);
    }, [webcamRef, setImgSrc]);

    
    function envoiPhoto(photo){
      props.envoiPhoto(photo);
      
  }
    
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <Button circular icon='camera ' color='green' onClick={capture}/>
       
        {imgSrc && (
          <img
            src={imgSrc} alt=""
          />
        )}
      </>
    );
  };
  export default Camera;
 