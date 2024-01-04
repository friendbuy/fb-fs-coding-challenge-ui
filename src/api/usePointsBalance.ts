import { useCallback, useEffect, useState } from "react";
import { useLoginStateController } from "../Login";

export const POINTS_BALANCE_KEY = "POINTS_BALANCE";

export function usePointsBalance() {
  const { userId } = useLoginStateController();
  const [points, setPoints] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const getData = useCallback(async (id: string) => {
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/points/balance/${id}`
      );
      if (!response.ok) {
        throw new Error(await response.json());
      }
      const data: { balance: number } = await response.json();
      setPoints(data.balance);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId, getData]);

  return { points, isLoading, error };
}
