import { Box, Button, Icon, Typography, Container, IconButton } from "@mui/material";
import images from "../../assets/images";
import { Home } from '@mui/icons-material';

import "./styles.css"
import { useNavigate } from "react-router-dom";

export default function Header({ pageName }) {
  const navigate = useNavigate();

  function handleHome() {
    navigate("/dashboard");
  }

  return (
    <Container maxWidth="100%" className="headerContainer" disableGutters sx={{ display: "flex" }}>
      <img src={images.logo} width="200px" style={{ padding: "16px" }} />
      <Box
        className="pageInfoBox"
        sx={{ padding: "10px" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Typography variant="h6" fontWeight={"bold"} style={{ marginLeft: "20px" }}>
          {pageName}
        </Typography>
      </Box>
      <IconButton size="large" style={{ width: "80px" }} onClick={handleHome}>
        <Home />
      </IconButton>
    </Container>
  )
}