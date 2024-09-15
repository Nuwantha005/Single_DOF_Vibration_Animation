import React, { useState } from "react";
import InputPanel from "./InputPanel";

function ControlPanel({ onSliderChange, onRestClicked, onPauseClicked }) {
  const [pauseBtnText, setPauseBtnText] = useState("Pause");

  const resetClickHandle = (event) => {
    onRestClicked();
  };

  const pauseClickHandle = (event) => {
    if (pauseBtnText == "Pause") {
      setPauseBtnText("Resume");
    } else {
      setPauseBtnText("Pause");
    }
    onPauseClicked();
  };

  return (
    <div className="w-full">
      <h2 class="text-4xl font-extrabold dark:text-white">
        Single DOF Vibrations
      </h2>
      <InputPanel
        labelName={"Mass"}
        initialValue={15}
        sensitivity={1}
        onChange={onSliderChange}
        id="m"
      ></InputPanel>

      <InputPanel
        labelName={"Damping Coefficient"}
        initialValue={5}
        sensitivity={1}
        onChange={onSliderChange}
        id="c"
      ></InputPanel>

      <InputPanel
        labelName={"Spring Constant"}
        initialValue={160}
        sensitivity={1}
        onChange={onSliderChange}
        id="k"
      ></InputPanel>

      <InputPanel
        labelName={"Initial Displacement"}
        initialValue={1}
        sensitivity={1}
        onChange={onSliderChange}
        id="x0"
      ></InputPanel>

      <InputPanel
        labelName={"Initial Velocity"}
        initialValue={5}
        sensitivity={1}
        onChange={onSliderChange}
        id="x0dot"
      ></InputPanel>

      <div className="grid gap-8 grid-cols-3 p-4 m-4">
        <button
          onClick={resetClickHandle}
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Restart
        </button>
        <button
          onClick={pauseClickHandle}
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {pauseBtnText}
        </button>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
