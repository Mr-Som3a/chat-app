import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "./login.jsx";
import SignupForm from "./signup.jsx";

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 4,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        {isLogin ? "Login" : "Sign Up"}
      </Typography>

      {isLogin ? (
        <LoginForm onSuccess={onAuthSuccess} btn={"login"} />
      ) : (
        <SignupForm onSuccess={onAuthSuccess} btn={"signup"} />
      )}

      <Button
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setIsLogin((prev) => !prev)}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </Button>
    </Box>
  );
};

export default AuthForm;
