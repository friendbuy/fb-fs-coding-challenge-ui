import { useContext } from "react";
import { LoginStateContext } from "./LoginStateContext";

export function useLoginStateController() {
  const state = useContext(LoginStateContext);

  if (state === null) {
    throw new Error(
      "Must use LoginStateProvider to use useLoginStateController"
    );
  }

  return state;
}
