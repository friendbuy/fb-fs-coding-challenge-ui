import { useQuery } from "@tanstack/react-query";
import { useLoginStateController } from "../Login";

export const POINTS_BALANCE_KEY = "POINTS_BALANCE";

export interface PointsBalanceProps {
    balance: number;
    error: null | {
        message: string;
    };
    isLoading: boolean;
    onPointsRedeemed: (points: number) => void; //TODO: Callback that isn't required everywhere but kept here for clarity of prop
}


export function usePointsBalance() {
  const { userId } = useLoginStateController();

  return useQuery({
    queryKey: [POINTS_BALANCE_KEY, userId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/points/balance/${userId}`
      );

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const data: { balance: number } = await response.json();
      return {...data, userId};
    },
    retry: false,
  });
}