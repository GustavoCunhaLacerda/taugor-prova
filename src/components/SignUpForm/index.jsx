import { useRef } from "react";
import { TextField, Button, Typography, Link } from '@mui/material/'

import { useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../../ultils/firebaseErrors";
import AuthErrorMessage from "../AuthErrorMessage";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUpForm() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { 
    handleRegister,
    setError,
    errorMessage,
  } = useAuth()

  function handleEnterSubmit(e) {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      nameRef.current.value === '' ||
      emailRef.current.value === '' ||
      passwordRef.current.value === '' ||
      passwordConfirmRef.current.value === ''
    ) {
      return setError('Todos os campos devem ser preenchidos');
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('As senhas não são iguais');
    }

    try {
      await handleRegister(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
      navigate('/', { replace: true });

    } catch (error) {

      const errorText = extractErrorMessage(error.message)
      setError(errorText)
    }
  }

  return (
    <>
      <Typography variant='h5' fontWeight={"bold"} className="formName"
        style={{
          color: "#2c9aea",
          marginBottom: '20px'
        }}>
        Registro
      </Typography>
      <TextField
        inputRef={nameRef}
        onKeyPress={handleEnterSubmit}
        label="Nome Completo"
        variant="outlined"
        size="small"
        fullWidth
        style={{ marginBottom: '15px' }}
      />
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
      <TextField
        type={"password"}
        inputRef={passwordConfirmRef}
        onKeyPress={handleEnterSubmit}
        label="Confime sua senha"
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
        Já possui uma conta? <Link href='/login'>Registrar</Link>
      </Typography>
    </>
  )
}