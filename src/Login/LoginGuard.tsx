import { ReactNode } from "react";
import { useLoginState } from "./useLoginState";
import { LoginStateProvider } from "./LoginStateProvider";
import { LoginPage } from "./LoginPage";

export interface LoginGuardProps {
  children: ReactNode;
}

export function LoginGuard({ children }: LoginGuardProps) {
  const state = useLoginState();
  const { isLoggedIn } = state;

  return (
    <LoginStateProvider state={state}>
      {!isLoggedIn ? (<LoginPage/>) : children}
    </LoginStateProvider>
  );
}
