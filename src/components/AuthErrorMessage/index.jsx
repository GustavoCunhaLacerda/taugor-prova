import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function AuthErrorMessage({ message }) {
  return (
    <Box sx={{
      width: '100%',
      height: '50px',
    }}>
      <Typography
        variant="body2"
        color="error"
        style={{
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}