import { useState } from "react";
import { Box, Heading, FormField, TextInput, Button } from "grommet";
import { useLoginStateController } from "./useLoginStateController";

export function LoginPage() {
  const { setUserId } = useLoginStateController();
  const [userIdInput, setUserIdInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogIn = () => {
    setErrorMessage("");

    if (userIdInput.trim() === "") {
      setErrorMessage("Please enter a valid User ID");
      return;
    }

    setUserId(userIdInput);
  };

  return (
    <Box>
      <Heading margin="small">Login Page</Heading>
      <Box margin="small" direction="row" gap="small">
        <FormField
          label="Enter User ID"
          error={errorMessage}
          margin={{
            bottom: "0px",
          }}
        >
          <TextInput
            placeholder="type here"
            value={userIdInput}
            onChange={(ev) => setUserIdInput(ev.target.value)}
          />
        </FormField>
        <Box>
          <Button primary onClick={handleLogIn} label="Log In" />
        </Box>
      </Box>
    </Box>
  );
}
