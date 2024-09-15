import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import P5Scene from "./P5Scene";

function DemoPanel() {
  const [inputs, setInputs] = useState({
    m: 15,
    c: 5,
    k: 160,
    x0: 1,
    x0dot: 5,
  });

  const [resetVal, setResetVal] = useState(false);
  const [pauseVal, setPauseVal] = useState(false);

  const handlePauseClick = () => {
    setPauseVal((prev) => !prev);
  };

  const handleSliderChange = (id, value) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleResetClick = () => {
    setResetVal((prev) => !prev);
  };
  return (
    <section className="m-4 grid grid-cols-1 gap-4 md:grid-cols-12 h-full">
      {/* Left Section: UI Components */}
      <div className="sm:col-span-6 md:col-span-4 max-h-screen">
        <ControlPanel
          onSliderChange={handleSliderChange}
          onRestClicked={handleResetClick}
          onPauseClicked={handlePauseClick}
        />
      </div>

      {/* Right Section: p5.js Animation Frame */}
      <div className="sm:col-span-6 md:col-span-8 h-full min-h-max h-screen">
        {/* <P5Sketch
          size={size}
          color={color}
          inputs={inputs}
          restBtnStat={resetVal}
          setResetBtnStat={handleResetClick}
        /> */}
        <P5Scene
          restBtnStat={resetVal}
          setResetBtnStat={handleResetClick}
          pauseBtnStat={pauseVal}
          setPauseBtnStat={handlePauseClick}
          inputs={inputs}
        />
      </div>
    </section>
  );
}

export default DemoPanel;
