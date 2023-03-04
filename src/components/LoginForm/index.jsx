import { useRef } from "react";
import { TextField, Button, Typography, Link } from '@mui/material/'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEnterSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Logado com sucesso!")
        navigate('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage })
      });
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