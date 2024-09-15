import React, { useState } from "react";

function InputPanel({ labelName, initialValue, sensitivity, onChange, id }) {
  const [rangeVal, setRangeVal] = useState(initialValue);
  const [minValue, setMinValue] = useState(
    initialValue - initialValue * sensitivity
  );
  const [maxValue, setMaxValue] = useState(
    initialValue + initialValue * sensitivity
  );

  const handleRangeChange = (event) => {
    setRangeVal(event.target.value);
    onChange(id, event.target.value);
  };

  const handleTextChange = (event) => {
    const userEnteredValue = Number(event.target.value);

    // Update range slider to make the value the middle of the range
    const newMinValue = userEnteredValue - userEnteredValue * sensitivity;
    const newMaxValue = userEnteredValue + userEnteredValue * sensitivity;

    // Update the state accordingly
    setRangeVal(userEnteredValue); // Set slider's value to user-entered value
    setMinValue(newMinValue); // Update min value
    setMaxValue(newMaxValue); // Update max value
  };

  return (
    <div className="w-full p-1 m-1">
      <label class="block w-full text-left mb-2 text-xl font-bolddark:text-white">
        {labelName}
      </label>
      <div className="flex items-center space-x-4">
        <input
          id="slider_value"
          type="range"
          value={rangeVal}
          min={minValue}
          max={maxValue}
          onChange={handleRangeChange}
          className="frex-grow w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          step="0.01"
        ></input>
        <input
          type="text"
          id="textField_value"
          onChange={handleTextChange}
          className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={rangeVal}
          required
        />
      </div>
    </div>
  );
}

//InputPanel.propTypes = {};

export default InputPanel;
