import { useContext, useEffect } from "react";
import { ModeContext } from "../context/context-mode";
import { capitalize } from "../utils";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  @media screen and (max-width: 700px) {
    padding: 10px;
  }
`;

const TitleWrapper = styled.div`
  flex-grow: 1;
  max-width: 85%;
`;

const MoonButton = styled.button`
  padding: 5px;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  transition: 0.2s;
  border-radius: 5px;
  color: ${(props) => (props.theme.color === "dark" ? "#E7EDF0" : "#1C1D1F")};
  border: 3px solid transparent;
  &:hover {
    opacity: 0.8;
    border: 3px solid
      ${(props) => (props.theme.color === "dark" ? "#E7EDF0" : "#1C1D1F")};
  }
`;

export default function Header() {
  const [mode, setMode] = useContext(ModeContext);

  const handleClick = () => {
    setMode({ color: mode.color === "ligth" ? "dark" : "ligth" });
  };

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  return (
    <HeaderWrapper className="shadow">
      <TitleWrapper>
        <h1>Where in the world?</h1>
      </TitleWrapper>
      <MoonButton onClick={handleClick}>
        <ion-icon name="moon-outline"></ion-icon>
        <span>{capitalize(mode.color)} Mode</span>
      </MoonButton>
    </HeaderWrapper>
  );
}
