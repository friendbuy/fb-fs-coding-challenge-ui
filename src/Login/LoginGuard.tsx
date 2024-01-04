import { ReactNode } from "react";
import { useLoginState } from "./useLoginState";
import { LoginStateProvider } from "./LoginStateProvider";
import { LoginPage } from "./LoginPage";
import { Box, Card, CardHeader, CardBody } from "grommet";

export interface LoginGuardProps {
  children: ReactNode;
}

export function LoginGuard({ children }: LoginGuardProps) {
  const state = useLoginState();
  const { isLoggedIn } = state;

  return (
    <LoginStateProvider state={state}>
      <LoginPage />
      {isLoggedIn && (
        <Box pad="medium" width="medium">
          <Card pad="small" background="accent-3" gap="small">
            <CardHeader>
              <strong>You are Logged In!</strong>
            </CardHeader>
            <CardBody>
              <p>
                Please Edit the <code>LoginGuard</code> component to display
                proper page according to the provided designs.
              </p>
            </CardBody>
          </Card>
        </Box>
      )}
    </LoginStateProvider>
  );
}
