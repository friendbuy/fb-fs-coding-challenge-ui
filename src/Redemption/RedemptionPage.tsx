import { Box, FormField, TextInput, Button } from "grommet";
import { useState, useEffect } from "react";

export function RedemptionPage(points: PointsBalanceProps) {
  const [amountToRedeem, setAmountToRedeem] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [pointsRedeemed, setPointsRedeemed] = useState(0);

  const handleRedeem = () => {
    setErrorMessage("");
    setPointsRedeemed(0);
    const pointsToBeRedeemed = amountToRedeem * 10;
    if(pointsToBeRedeemed > points.balance) {
        setErrorMessage("You have exceeded the amount available. Please enter a smaller amount.")
    } else {
        setAmountToRedeem(0);
        setPointsRedeemed(pointsToBeRedeemed);
        points.onPointsRedeemed(pointsToBeRedeemed);
    }
  }

  return (
    <Box direction="column" margin="small" align="start">
        <Box margin="small" direction="row" gap="small" align="flex-end" alignContent="between">
            <FormField
              label="Enter Amount in USD"
              error={errorMessage}
              margin={{
                bottom: "0px",
              }}
            >
              <TextInput
                placeholder="type here"
                value={(amountToRedeem === 0) ? "" : amountToRedeem}
                onChange={(ev) => setAmountToRedeem(Number(ev.target.value))}
              />
            </FormField>
            <Box>
              <Button primary onClick={handleRedeem} label="Redeem" />
            </Box>
        </Box>
        <Box margin={{left: "20px"}}>
            ({amountToRedeem*10} Points)
        </Box>
        <Box margin={{left:"20px"}}>
            {pointsRedeemed > 0 && (
              <div style={{ color: 'green', marginTop: '10px' }}>You just redeemed {pointsRedeemed} points</div>
            )}
        </Box>
    </Box>
  );
}