import { Box } from "grommet";
import { usePointsBalance } from "./api";
import { formatCurrency, convertPointsToDollarAmount } from "./utils";

export function DisplayPointsBalance() {
  const { points, error, isLoading } = usePointsBalance();
  return (
    <Box margin="small" direction="row" gap="small" align="flex-end">
      {isLoading && <>Loading Points Balance</>}
      {error && <>Could not load points balance: {error}</>}
      {points && (
        <>
          You have {formatCurrency("USD", convertPointsToDollarAmount(points))}{" "}
          to use (Points balance: {points})
        </>
      )}
    </Box>
  );
}
