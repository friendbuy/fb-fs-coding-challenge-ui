import { Box } from "grommet";
import { formatCurrency, convertPointsToDollarAmount } from "./utils";
import { PointsBalanceProps } from "./api";

export function DisplayPointsBalance(points: PointsBalanceProps) {
  return (
    <Box margin="small" direction="row" gap="small" align="flex-end">
      {points.isLoading && <>Loading Points Balance</>}
      {points.error && <>Could not load points balance: {points.error.message}</>}
      {points?.balance >=0 && (
        <>
          You have{" "}
          {formatCurrency("USD", convertPointsToDollarAmount(points.balance))} to
          use (Points balance: {points.balance})
        </>
      )}
    </Box>
  );
}
