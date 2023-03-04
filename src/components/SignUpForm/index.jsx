import { useRef } from "react";
import { TextField, Button, Typography, Link } from '@mui/material/'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"

import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  function handleEnterSubmit(e) {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  function handleSubmit(e) {
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
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
      <Button
        variant="outlined"
        onClick={handleSubmit}
        style={{ marginBottom: '20px' }}>
        Entrar
      </Button>
      <Typography variant="body1" component="span">
        Já possui uma conta? <Link href='/login'>Entre</Link>
      </Typography>
    </>
  )
}