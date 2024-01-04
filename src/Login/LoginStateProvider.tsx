import { ReactNode } from "react";
import { LoginState } from "./useLoginState";
import { LoginStateContext } from "./LoginStateContext";

export interface LoginStateProviderProps {
  state: LoginState;
  children: ReactNode;
}

export function LoginStateProvider({
  state,
  children,
}: LoginStateProviderProps) {
  return (
    <LoginStateContext.Provider value={state}>
      {children}
    </LoginStateContext.Provider>
  );
}
