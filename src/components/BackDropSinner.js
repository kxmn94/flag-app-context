import { useContext } from "react";
import { ModeContext } from "../context/context-mode";
import { AtomSpinner } from "react-epic-spinners";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BackDropSinner() {
  const [mode] = useContext(ModeContext);
  
  return (
    <Container>
      <AtomSpinner color={mode.color === "ligth" ? "black" : "white"} size={100}/>
    </Container>
  )
}
