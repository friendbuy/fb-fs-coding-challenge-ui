import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { LoginGuard } from "./Login";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Grommet full theme={grommet}>
      <LoginGuard>
        <App />
      </LoginGuard>
    </Grommet>
  </React.StrictMode>
);
