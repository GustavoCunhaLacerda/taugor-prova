import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box, Collapse, Icon } from "@mui/material";
import { Add, Download, Remove } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import { formatDate } from "../../ultils/date";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfProfile from "../PdfProfile";

export default function CardListItem({ employee, employeeId, historic }) {
  const [details, setDetails] = useState(false);

  const navigate = useNavigate()
  const { updateFormData, currProfile, manageEmployee } = useProfile();

  function toggleDetails() {
    setDetails(!details);
  }

  function handleEdition() {
    updateFormData({
      ...employee,
      birthDate: formatDate(employee.birthDate),
      admissionDate: formatDate(employee.admissionDate),
    });
    currProfile.current = employeeId;
    navigate('/profile');
  }

  function handleDismissal(e) {
    updateFormData({
      ...employee,
      birthDate: formatDate(employee.birthDate),
      admissionDate: formatDate(employee.admissionDate),
    });

    currProfile.current = employeeId;
    manageEmployee(e, true, {
      ...employee,
      birthDate: formatDate(employee.birthDate),
      admissionDate: formatDate(employee.admissionDate),
    });
  }

  function handleHistoric() {
    navigate('/historic/' + employee.id);
  }

  return (
    <>
      <Card sx={{ display: 'flex', padding: "10px", margin: "10px 10px 0 10px", borderBottomRightRadius: details ? 0 : 6, borderBottomLeftRadius: details ? 0 : 6 }}>
        <CardMedia
          sx={{ height: 100, width: 100 }}
          image={employee.profileImage}
          title="Profile Pic"
        />
        <CardContent style={{ width: "auto", flexGrow: 1 }}>
          <Box display={"flex"} alignItems={"center"}>
            <Typography variant="h6" component="div" marginRight={"8px"}>
              {employee.name + employee.surname}
            </Typography>
            <Typography variant="body2" color={{
              "Active": "green",
              "Inactive": "red",
              "Modified": "#ccc",
            }[employee.status]}>
              {{
                "Active": "Ativo",
                "Inactive": "Inativo",
                "Modified": "Modificado",
              }[employee.status]}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {employee.role}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={toggleDetails}>
            DETALHES
            {details ?
              <Remove fontSize="13px" /> :
              <Add fontSize="13px" />
            }
          </Button>
          {
            !historic && <>
              <Button size="small" onClick={handleEdition}>EDITAR</Button>
              <Button size="small" onClick={handleHistoric}>HISTÓRICO</Button>
              <Button size="small" onClick={handleDismissal} color="error" disabled={!(employee.status === "Active")}>DEMITIR</Button>
            </>
          }

          <PDFDownloadLink
            document={
              <PdfProfile profile={{
                ...employee,
                birthDate: formatDate(employee.birthDate),
                admissionDate: formatDate(employee.admissionDate),
              }} />
            } fileName={`${employee.name}Profile.pdf`}>
            {({ loading }) => (
              <Button size="small" disabled={loading}>
                <Download />
              </Button>
            )}
          </PDFDownloadLink>

        </CardActions>
      </Card>
      <Collapse in={details}>
        <Card sx={{ display: 'flex', padding: "10px", margin: "0 10px", borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
          <Box marginRight={10}>
            <Typography variant="body2" color="text.secondary">
              <strong>Sexo:</strong> {employee.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Endereço:</strong> {employee.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Telefone:</strong> {employee.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Data de nascimento:</strong> {formatDate(employee.birthDate)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Data de admissão:</strong> {formatDate(employee.admissionDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Setor:</strong> {employee.sector}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Salário:</strong> {employee.salary}
            </Typography>
          </Box>
        </Card>
      </Collapse>
    </>
  )
}