import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { LoginGuard } from "./Login";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Grommet full theme={grommet}>
        <LoginGuard>
          <App />
        </LoginGuard>
      </Grommet>
    </QueryClientProvider>
  </React.StrictMode>
);
