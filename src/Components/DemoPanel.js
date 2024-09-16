import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import P5Scene from "./P5Scene";

var Latex = require("react-latex");

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
  const [speedVal, setSpeedVal] = useState(0.05);

  const handleSpeedChange = (value) => {
    setSpeedVal(value);
  };
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
    <section className="m-1 grid grid-cols-1 sm:grid-cols-12 gap-4 h-full bg-slate-100">
      {/* Left Section: UI Components */}
      <div className="sm:col-span-4 lg:col-span-3 bg-slate-100">
        <ControlPanel
          onSliderChange={handleSliderChange}
          onRestClicked={handleResetClick}
          onPauseClicked={handlePauseClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onSpeedChange={handleSpeedChange}
        />
        {/* <div className="justify-center h-full bg-slate-100">
          <h2 className="text-4xl align-middle justify-center">
            <Latex displayMode={true}>
              {"$$ x(t) = Xe^{\\beta\\omega_n t}Sin(omega_d t +shi) $$"}
            </Latex>
          </h2>
        </div> */}
      </div>

      {/* Right Section: p5.js Animation Frame */}
      <div className="sm:col-span-8 lg:col-span-9 w-full min-h-96 sm:h-full sm:min-h-svh bg-slate-100">
        <P5Scene
          className={"bg-slate-100"}
          restBtnStat={resetVal}
          setResetBtnStat={handleResetClick}
          pauseBtnStat={pauseVal}
          setPauseBtnStat={handlePauseClick}
          inputs={inputs}
          mouseUpVal={mouseUpVal}
          mouseDownVal={mouseDownVal}
          setMouseUpStat={handleMouseUp}
          speed={speedVal}
        />
      </div>
    </section>
  );
}

export default DemoPanel;
