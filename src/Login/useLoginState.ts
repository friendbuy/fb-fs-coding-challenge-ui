import { useState } from "react";

const localStorageKey = "USER_ID";

function loadUserId() {
  try {
    return JSON.parse(localStorage.getItem(localStorageKey) ?? "") as string;
  } catch (e) {
    return null;
  }
}

function storeUserId(userId: string | null) {
  localStorage.setItem(localStorageKey, JSON.stringify(userId));
}

export interface LoginState {
  userId: string | null;
  setUserId: (userId: string) => void;
  logOut: () => void;
  isLoggedIn: boolean;
}

export function useLoginState(): LoginState {
  const [userId, setUserIdState] = useState<string | null>(loadUserId());

  const setUserId = (userId: string | null) => {
    setUserIdState(userId);
    storeUserId(userId);
  };

  const logOut = () => setUserId(null);

  return {
    userId,
    logOut,
    setUserId,
    isLoggedIn: userId !== null,
  };
}
