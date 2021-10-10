import { Checkboxes } from "./Checkboxes";
import { montConfig, montConfig_fromServer } from "./config";
import { Month } from "./Month";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Vacation Calendar</h1>
      {/* <Checkboxes /> */}
      <Month days={montConfig} update={montConfig_fromServer} />
      <Month days={montConfig} />
      <Month days={montConfig} />
      <Month days={montConfig} />
      <Month days={montConfig} />
      <Month days={montConfig} />
      <Month days={montConfig} />
      <Month days={montConfig} />
      <Month days={montConfig} />
    </div>
  );
}
