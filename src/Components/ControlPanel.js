import React, { useState } from "react";
import InputPanel from "./InputPanel";

function ControlPanel({
  onSliderChange,
  onRestClicked,
  onPauseClicked,
  onMouseDown,
  onMouseUp,
  onSpeedChange,
}) {
  const [pauseBtnText, setPauseBtnText] = useState("Pause");
  const [timeStat, setTimeStat] = useState(true);
  const [speedRange, setSpeedRange] = useState(1 / 60);

  const handleCheckBox = (event) => {
    setTimeStat((prev) => !prev);
    setSpeedRange(1 / 60);
    onSpeedChange(1 / 60);
  };

  const handleSpeedChange = (event) => {
    setSpeedRange(Number(event.target.value));
    if (!timeStat) {
      onSpeedChange(speedRange);
    }
  };

  const resetClickHandle = (event) => {
    onRestClicked();
  };

  const pauseClickHandle = (event) => {
    if (pauseBtnText === "Pause") {
      setPauseBtnText("Resume");
    } else {
      setPauseBtnText("Pause");
    }
    onPauseClicked();
  };

  return (
    <div className="flex flex-col">
      <h2 class="text-4xl font-extrabold dark:text-white">
        Single DOF Vibrations
      </h2>
      <InputPanel
        labelName={"Mass"}
        initialValue={15}
        sensitivity={1}
        onChange={onSliderChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        id="m"
      ></InputPanel>

      <InputPanel
        labelName={"Damping Coefficient"}
        initialValue={5}
        sensitivity={1}
        onChange={onSliderChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        id="c"
      ></InputPanel>

      <InputPanel
        labelName={"Spring Constant"}
        initialValue={160}
        sensitivity={1}
        onChange={onSliderChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        id="k"
      ></InputPanel>

      <InputPanel
        labelName={"Initial Displacement"}
        initialValue={1}
        sensitivity={1}
        onChange={onSliderChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        id="x0"
      ></InputPanel>

      <InputPanel
        labelName={"Initial Velocity"}
        initialValue={5}
        sensitivity={1}
        onChange={onSliderChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        id="x0dot"
      ></InputPanel>
      <div className="w-full p-1 m-1">
        <label class="block w-full text-left mb-2 text-xl font-bolddark:text-white">
          Speed
        </label>
        <div className="flex items-center space-x-4">
          <input
            id="slider_value"
            type="range"
            value={speedRange}
            min={0.005}
            max={0.1}
            disabled={timeStat}
            onChange={handleSpeedChange}
            className="frex-grow w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            step="0.001"
          ></input>
          <label class="inline-flex items-center cursor-pointer">
            <input
              checked={timeStat}
              onChange={handleCheckBox}
              type="checkbox"
              value=""
              class="sr-only peer"
            />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Realtime
            </span>
          </label>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-3 p-2 m-2">
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
