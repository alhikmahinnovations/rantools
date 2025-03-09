import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      // height="100vh"
      textAlign="center"
    >
      <Typography variant="h3" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Oops! La page que vous recherchez n'existe pas.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Aller à la page d'accueil.
      </Button>
    </Box>
  );
};

export default ErrorPage;
