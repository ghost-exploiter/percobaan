
import './App.css';
import { QrReader } from 'react-qr-reader';
import { useEffect, useRef, useState } from 'react';

function App() {

  const videoRef = useRef(null);

  

  const [data, setData] = useState("")

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: '100%', height: '100vh', position: 'fixed' } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };


  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div>
      <video autoPlay={true} ref={videoRef}></video>
      <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
            
          }}
          scanDelay={10000000}
          onScan={(v) => {
            console.log(v)
          }}
          style={{ width: "600px", height: '200px'}}
          containerStyle={{ maxWidth: '250px', paddingTop: "0px", paddingBottom: "0px", width: '500px',  borderRadius: "20px", position: 'absolute', top: '0'   }}
          videoStyle={{  margin: '12px auto', objectFit: "cover", borderRadius: "20px" }}
        />
        <p>{data}</p>
    </div>
  );
}

export default App;
