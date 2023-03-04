import { Add } from "@mui/icons-material";
import { Button, Fab } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CardList from "../../components/CardList";
import Header from "../../components/Header";
import { useDashboard } from "../../contexts/DashboardContext";
import { useProfile } from "../../contexts/ProfileContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { employeesList } = useDashboard();
  const { resetFormData } = useProfile();

  function handleAddEmployee() {
    resetFormData();
    navigate('/profile')
  }

  return (
    <>
      <Header pageName="Lista de Funcionários" />
      <Box display="flex" justifyContent="flex-end">
        <Fab variant="extended" color="primary" style={{ margin: "10px" }} onClick={handleAddEmployee}>
          <Add />
          Adicionar Funcionário
        </Fab>
      </Box>
      <div className="cardListContainer" style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <CardList employees={employeesList} historic={false}/>
      </div>
    </>
  )
}