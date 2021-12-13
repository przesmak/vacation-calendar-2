import { Checkboxes } from "./Checkboxes";
import { montConfig, montConfig_fromServer } from "./config";
import { Month } from "./Month";
import "./styles.css";
import styled from "styled-components";

export default function App() {
  return (
    <div className="App">
      <h1>Vacation Calendar</h1>
      {/* <Checkboxes /> */}
      <ContainerMonths>
        <Month days={montConfig} update={montConfig_fromServer} />
        <Month days={montConfig} />
      </ContainerMonths>
    </div>
  );
}


const ContainerMonths = styled.div`
  /* width: 500px;
  height: 100px; */
  /* overflow-x: scroll; */
`;
