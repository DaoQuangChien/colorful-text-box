import React, { useEffect, useState } from "react";

const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
const generateColorfullCharacter = (char, id) => ({
  id: `${new Date().getTime()}${id ? `-${id}` : ""}`,
  value: char,
  color: generateRandomColor(),
});
const generateDefaultColorfullMessage = (defaultMessage) =>
  defaultMessage
    .split("")
    .map((char, i) => generateColorfullCharacter(char, i));
const addNewCharacterToInputArr = (inputString, inputArr) => {
  const inputStringArr = inputString.split("");

  return inputStringArr.map((char, i) => {
    const input = generateColorfullCharacter(char, i);

    if (i === inputStringArr.length - 1 || inputArr[i]?.value !== char) {
      return input;
    }
    return inputArr[i] ?? input;
  });
};
const ColorfulTextBox = () => {
  const defaultMessage = "Type something to the text box";
  const [inputValueArr, setInputValueArr] = useState(
    generateDefaultColorfullMessage(defaultMessage)
  );
  const handleInputChange = (e) => {
    /*
    - To make the characters keep their own color, i have to construct an array of object.
    Each object contains the character, its color and a unique ID

    - The "inputValueArr" will be the constructed result text array
    - To get "inputValueArr", i break the text box value and "inputValueArr" if it's already existed into 2 parts: before and after the cursor position. The part before cursor will have the newly typed character in it, the "inputValueArr" part after cursor will be reused in the result text array if it existed.
    - Compare each part respectively:
      + 2 parts before the cursor: For each character object
        - If it existed in "inputValueArr", use it for the result text array
        - If it doesn't existed in "inputValueArr" or it's the last character in text box value, generate a new character object
      + 2 parts after the cursor: Based on the difference is length of current text box value and "inputValueArr" to reuse.
    */
    const curInput = e.currentTarget.value;
    const curInputArr = curInput.split("");
    const curInputLength = curInputArr.length;
    const oldInputLength = inputValueArr.length;
    const currentCursorPos = e.currentTarget.selectionStart;
    const inputBeforeCursor = curInput.slice(0, currentCursorPos);
    const newInputBeforeCursorArr = addNewCharacterToInputArr(
      inputBeforeCursor,
      inputValueArr.filter((_, i) => i < inputBeforeCursor.length)
    );
    const inputAfterCursorArr = inputValueArr.filter(
      (_, i) =>
        i >= inputBeforeCursor.length - (curInputLength - oldInputLength)
    );

    setInputValueArr([...newInputBeforeCursorArr, ...inputAfterCursorArr]);
  };

  useEffect(() => {
    if (!inputValueArr.length) {
      setInputValueArr(generateDefaultColorfullMessage(defaultMessage));
    }
  }, [inputValueArr]);
  return (
    <>
      <input className="input-box" onChange={handleInputChange} />
      <div className="result-container">
        {inputValueArr.length > 0 &&
          inputValueArr.map(({ id, value, color }) =>
            value.trim() ? (
              <span key={id} style={{ color }}>
                {value}
              </span>
            ) : (
              <span key={id}>&nbsp;</span>
            )
          )}
      </div>
    </>
  );
};

export default ColorfulTextBox;
