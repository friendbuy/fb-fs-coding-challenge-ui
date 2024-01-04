import { Box, Heading } from "grommet";
import { AppBar } from "./AppBar";
import { DisplayPointsBalance } from "./DisplayPointsBalance";

export function App() {
  return (
    <Box>
      <AppBar />
      <Heading margin="small">Redeem Points</Heading>
      <DisplayPointsBalance />
    </Box>
  );
}
