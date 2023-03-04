
import { Typography } from "@mui/material"
import images from "../../assets/images"

import "./styles.css"

export default function AuthContainer({ children }) {
  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authHeader">
          <img src={images.logoWhite} width={"100%"} alt="Taugor Logo" />
          <Typography
            variant='h6'
            className="subtitle" 
            style={{ 
              color: "#fff", 
              padding: "5px 15px", 
              borderLeft: "2px solid #fff"}}>
            Sistema de Gestão de Funcionários
          </Typography>
        </div>
        <div className="authForm">
          {children}
        </div>
      </div>
    </div >
  )
}