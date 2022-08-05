import Blobs from "./components/Blobs";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);

  function handleStart(){
    setStarted(true);
  }

  return (
    <main>
      <div className="container">
        <Blobs />
        {started ? <Questions /> : <StartScreen handleStart={handleStart} />}
      </div>
    </main>
  )
}