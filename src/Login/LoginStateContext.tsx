import { createContext } from "react";
import { LoginState } from "./useLoginState";

export const LoginStateContext = createContext<LoginState | null>(null);
