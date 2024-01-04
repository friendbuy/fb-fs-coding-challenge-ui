import { Box, Button } from "grommet";
import { useLoginStateController } from "./Login";

export function AppBar() {
  const { logOut, userId } = useLoginStateController();

  return (
    <Box
      margin="small"
      direction="row"
      gap="small"
      align="center"
      justify="between"
    >
      <Box>Logged in as user id: {userId}</Box>
      <Box>
        <Button secondary onClick={logOut} label="Log Out" />
      </Box>
    </Box>
  );
}
