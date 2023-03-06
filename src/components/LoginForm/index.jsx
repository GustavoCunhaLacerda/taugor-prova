import { useRef } from "react";
import { TextField, Button, Typography, Link } from '@mui/material/'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthErrorMessage from "../AuthErrorMessage";
import { extractErrorMessage } from "../../ultils/firebaseErrors";

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const {
    handleLogin,
    setError,
    errorMessage,
  } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value === '' || passwordRef.current.value === '') {
      return setError('Digite o email e a senha');
    }

    try {
      await handleLogin(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch (error) {
      const errorText = extractErrorMessage(error.message);
      setError(errorText)
    }
  }

  const handleEnterSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <>
      <Typography variant='h5' fontWeight={"bold"} className="formName"
        style={{
          color: "#2c9aea",
          marginBottom: '20px'
        }}>
        Login
      </Typography>
      <TextField
        type={"email"}
        inputRef={emailRef}
        onKeyPress={handleEnterSubmit}
        label="E-mail"
        variant="outlined"
        size="small"
        fullWidth
        style={{ marginBottom: '15px' }}
      />
      <TextField
        type={"password"}
        inputRef={passwordRef}
        onKeyPress={handleEnterSubmit}
        label="Senha"
        variant="outlined"
        size="small"
        fullWidth
        style={{ marginBottom: '15px' }}
      />
      <AuthErrorMessage message={errorMessage} />
      <Button
        variant="outlined"
        onClick={handleSubmit}
        style={{ marginBottom: '20px' }}>
        Entrar
      </Button>
      <Typography variant="body1" component="span">
        Não tem uma conta? <Link href='/signup'>Inscreva-se</Link>
      </Typography>
    </>
  )
}