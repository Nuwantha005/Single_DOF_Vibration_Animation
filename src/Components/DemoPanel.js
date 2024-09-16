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
  const [mouseDownVal, setMouseDownVal] = useState(false);
  const [mouseUpVal, setMouseUpVal] = useState(false);

  const handleMouseDown = () => {
    setMouseDownVal((prev) => !prev);
    setPauseVal(true);
  };

  const handleMouseUp = () => {
    setMouseUpVal((prev) => !prev);
    setPauseVal(false);
  };

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
    <section className="m-4 grid grid-cols-12 gap-4 h-full">
      {/* Left Section: UI Components */}
      <div className="col-span-12 sm:col-span-4 md:col-span-3">
        <ControlPanel
          onSliderChange={handleSliderChange}
          onRestClicked={handleResetClick}
          onPauseClicked={handlePauseClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </div>

      {/* Right Section: p5.js Animation Frame */}
      <div className="col-span-12 sm:col-span-8 md:col-span-9 h-full min-h-svh min-w-fit">
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
          mouseUpVal={mouseUpVal}
          mouseDownVal={mouseDownVal}
          setMouseUpStat={handleMouseUp}
        />
      </div>
    </section>
  );
}

export default DemoPanel;
