import { TextInput } from "./ui";
import { useState } from "react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div>
      <h1>App</h1>
      <TextInput.Input />
      <select name="" id="">
        <option>선택</option>
      </select>
      <button onClick={() => document.body.classList.toggle("dark")}>
        {isDarkMode ? "DarkMode" : "lightMode"}
      </button>
    </div>
  );
};

export default App;
