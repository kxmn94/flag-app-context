import { useState, createContext } from "react";

const initialValue = {
  color: "ligth",
};

export const ModeContext = createContext();

export const ModeContextProvider = (props) => {
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode")) || initialValue);

  return (
    <ModeContext.Provider value={[mode, setMode]}>
      {props.children}
    </ModeContext.Provider>
  );
};
