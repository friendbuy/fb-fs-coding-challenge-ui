import { Box, Heading } from "grommet";
import { AppBar } from "./AppBar";
import { DisplayPointsBalance } from "./DisplayPointsBalance";
import { usePointsBalance } from "./api";
import { RedemptionPage } from "./Redemption/RedemptionPage";
import { useState, useEffect } from "react";
import { useLoginState } from "./Login/useLoginState";
import { useQueryClient } from '@tanstack/react-query';
import { POINTS_BALANCE_KEY } from "./api/usePointsBalance";

import { QueryCache } from '@tanstack/react-query'

export function App() {
  const { data, error, isLoading } = usePointsBalance();
  const [pointsBalance, setPointsBalance] = useState(data?.balance || 0);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const queryClient = useQueryClient();

    console.log('usePointsBalance: ', data);

    //It's possible for the first load to return a value of zero and hence triggering with an effect.
    useEffect(() => {
      if (data && data.balance !== undefined) {
        setPointsBalance(data.balance);
      }
    }, [data]);

    useEffect(() => {
      if(pointsToRedeem) {
          fetch(
             `http://localhost:8080/users/${data.userId}/points/${pointsToRedeem}`,
             {
              method:'POST'
             }
          )
          .then(r => {
              if(!r.ok) {
                  throw new Error("Something went wrong");
              } else {
                  return r.json();
              }
          })
          .then(r => {
              setPointsBalance(r.balance);
              setPointsToRedeem(0);
              queryClient.setQueryData([POINTS_BALANCE_KEY, data.userId], {
                ...data,
                balance:r.balance,
              });
          })
          .catch(e => {
              //TODO: This needs clarity on what's expected behavior...for now simply logging.
              console.log('error in points setting/fetching',e);
          });
      }
    }, [pointsToRedeem]);

  const props = {
    balance: pointsBalance,
    error,
    isLoading,
    onPointsRedeemed: setPointsToRedeem,
  }
  return (
    <Box>
      <AppBar />
      <Heading margin="small">Redeem Points</Heading>
      <DisplayPointsBalance {...props} />
      <RedemptionPage {...props}/>
    </Box>
  );
}
