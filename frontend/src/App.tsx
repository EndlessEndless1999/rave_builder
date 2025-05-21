// import { useState } from 'react'
import { useEffect, useState } from "react"
import { Button } from "./components/ui/button"
import { OnFileDrop} from "../wailsjs/runtime"
import {ReadFile} from "../wailsjs/go/main/App"


function App() {

  const [base64Audio, setBase64Audio] = useState<string | null>(null);

  useEffect(() => {
    OnFileDrop((_, __, paths) => {

      const path = paths[0];

      ReadFile(path).then(data => {
        setBase64Audio(data)
      })
    }, true);
  },[])

  return (
    // Replace Image Tags with Audio Tags
    <>
      <div className="flex flex-col h-dvh w-dvw p-4 gap-4">
        <div className="flex flex-row h-1/2 w-full gap-4">
          <div className="border rounded overflow-hidden w-1/2"
          style={{"--wails-drop-target": "drop"} as React.CSSProperties}>

          {base64Audio ? (
            <audio controls className="w-full">
              <source src={`data:audio/mpeg;base64,${base64Audio}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-center">Drop an audio file here</p>
          )}
          </div>
          
          <div className="border rounded overflow-hidden w-1/2"></div>
        </div>


        <Button>Play Song</Button>
      </div>
    </>
  )
}

export default App
