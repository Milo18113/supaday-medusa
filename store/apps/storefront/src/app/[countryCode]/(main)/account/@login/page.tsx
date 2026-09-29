import { STORE_NAME } from "@lib/store-info"
import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: `Inicia sesión en tu cuenta de ${STORE_NAME}.`,
}

export default function Login() {
  return <LoginTemplate />
}
