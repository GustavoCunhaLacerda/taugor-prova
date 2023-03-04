import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../../components/Header";

import { PDFViewer } from '@react-pdf/renderer';
import PdfProfile from "../../components/PdfProfile";
import ReactInputMask from "react-input-mask";
import { useProfile } from "../../contexts/ProfileContext";
import { getBase64 } from "../../ultils/files";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { formData, updateFormData, manageEmployee } = useProfile();

  function handleSubmit(e) {
    manageEmployee(e).then(() => {
      navigate('/dashboard');
    });
  }

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    getBase64(file)
      .then(result => {
        file["base64"] = result;
        updateFormData({ profileImage: result });
      })
  };

  return (
    <>
      <Header pageName="Cadastro de Funcionário" />
      <Box display="flex" sx={{ width: "100%" }}>
        <Box
          display="flex"
          flex={6}
          justifyContent="center"
        >
          <Box
            width={"40%"}
          >
            <Typography variant="h5" marginBottom={"20px"}>
              Informações de Contato
            </Typography>
            <Box display="flex">
              <Box display="flex" flexDirection="column" flex={1} justifyContent="center">
                <TextField
                  label={"Nome"}
                  type={"text"}
                  variant="filled"
                  size="normal"
                  style={{ marginBottom: '30px' }}
                  value={formData.name}
                  onChange={e => updateFormData({ name: e.target.value })}
                />
                <TextField
                  label={"Sobrenome"}
                  type={"text"}
                  variant="filled"
                  size="normal"
                  style={{ marginBottom: '30px' }}
                  value={formData.surname}
                  onChange={e => updateFormData({ surname: e.target.value })}
                />
              </Box>
              <Box display="flex" flexDirection="column" flex={1} alignItems={"center"}>
                <img src={formData.profileImage} width={140} height={140} />
                <Button
                  style={{ marginTop: '10px' }}
                  variant="contained"
                  component="label">
                  Subir Foto
                  <input hidden type="file" onChange={handleFileInputChange} />
                </Button>
              </Box>
            </Box>
            <FormControl>
              <FormLabel>Gênero</FormLabel>
              <RadioGroup
                row
                defaultValue="female"
                value={formData.genre}
                onChange={e => updateFormData({ genre: e.target.value })}
              >
                <FormControlLabel value="female" control={<Radio size="small" />} label="Feminino" />
                <FormControlLabel value="male" control={<Radio size="small" />} label="Masculino" />
                <FormControlLabel value="other" control={<Radio size="small" />} label="Outro" />
              </RadioGroup>
            </FormControl>
            <TextField
              label={"Endereço"}
              type={"text"}
              variant="filled"
              size="normal"
              fullWidth
              style={{ marginBottom: '30px', marginTop: '30px' }}
              value={formData.address}
              onChange={e => updateFormData({ address: e.target.value })}
            />
            <Box display="flex" justifyContent={"space-between"}>
              <Box display="flex" flexDirection="column">
                <ReactInputMask
                  mask="(99) 9 9999-9999"
                  maskChar=" "
                  alwaysShowMask={false}
                  value={formData.phone}
                  onChange={e => updateFormData({ phone: e.target.value })}
                >
                  {_ => <TextField
                    label={"Telefone"}
                    type={"text"}
                    variant="filled"
                    size="normal"
                    style={{ marginBottom: '30px' }}
                  />}
                </ReactInputMask>
                <TextField
                  label={"E-mail"}
                  type={"email"}
                  variant="filled"
                  size="normal"
                  style={{ marginBottom: '30px' }}
                  value={formData.email}
                  onChange={e => updateFormData({ email: e.target.value })}
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <TextField
                  label={"Nacionalidade"}
                  type={"text"}
                  variant="filled"
                  size="normal"
                  style={{ marginBottom: '30px' }}
                  value={formData.nacionality}
                  onChange={e => updateFormData({ nacionality: e.target.value })}
                />
                <ReactInputMask
                  mask="99/99/9999"
                  maskChar=" "
                  value={formData.birthDate}
                  onChange={e => updateFormData({ birthDate: e.target.value })}
                >
                  {() => <TextField
                    label={"Data de nascimento"}
                    type={"text"}
                    variant="filled"
                    size="normal"
                    style={{ marginBottom: '30px' }}
                  />}
                </ReactInputMask>
              </Box>
            </Box>
            <Typography variant="h5" marginBottom={"20px"}>
              Informações de Funcionário
            </Typography>
            <Box display="flex" justifyContent={"space-between"}>
              <Box display="flex" flexDirection="column">
                <TextField
                  label={"Função"}
                  type={"text"}
                  variant="filled"
                  size="normal"
                  style={{ marginBottom: '30px' }}
                  value={formData.role}
                  onChange={e => updateFormData({ role: e.target.value })}
                />
                <TextField
                  label={"Setor"}
                  type={"text"}
                  variant="filled"
                  size="normal"
                  style={{ marginBottom: '30px' }}
                  value={formData.sector}
                  onChange={e => updateFormData({ sector: e.target.value })}
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <ReactInputMask
                  mask="99/99/9999"
                  maskChar=" "
                  value={formData.admissionDate}
                  onChange={e => updateFormData({ admissionDate: e.target.value })}
                >
                  {() => <TextField
                    label={"Data de admissão"}
                    type={"text"}
                    variant="filled"
                    size="normal"
                    style={{ marginBottom: '30px' }}
                  />}
                </ReactInputMask>
                <TextField
                  label={"Salário"}
                  type={"text"}
                  variant="filled"
                  size="normal"
                  style={{ marginBottom: '30px' }}
                  value={formData.salary}
                  onChange={e => updateFormData({ salary: e.target.value })}
                />
              </Box>
            </Box>
            <Button onClick={handleSubmit} variant="contained">
              {"SALVAR"}
            </Button>
          </Box>
        </Box>
        <Box display="flex" flex={4} height={"100vh"}>
          <PDFViewer showToolbar={false} width={"100%"} height={"90%"}>
            <PdfProfile profile={formData} />
          </PDFViewer>
        </Box>
      </Box>
    </>
  );
}
