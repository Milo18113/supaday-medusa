import React from "react"

import { IconProps } from "types/icon"

/**
 * Silueta de persona con sombrero de paja toquilla (ala ancha + cinta),
 * usada para el link "Mi cuenta" en vez del ícono genérico de usuario.
 */
const PanamaHatUser: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      {/* Cuerpo/hombros */}
      <path
        d="M16.6663 18V16.3333C16.6663 15.4493 16.3152 14.6014 15.69 13.9763C15.0649 13.3512 14.2171 13 13.333 13H6.66634C5.78229 13 4.93444 13.3512 4.30932 13.9763C3.6842 14.6014 3.33301 15.4493 3.33301 16.3333V18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cara */}
      <path
        d="M12.917 8.33333C12.917 10.1743 11.6247 11.6667 10.0003 11.6667C8.37599 11.6667 7.08366 10.1743 7.08366 8.33333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Copa del sombrero de paja toquilla */}
      <path
        d="M8.33366 6.66667C8.33366 5.74619 9.07985 5 10.0003 5C10.9208 5 11.667 5.74619 11.667 6.66667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ala ancha del sombrero */}
      <path
        d="M5.83366 7.08333C5.83366 6.62310 6.20676 6.25 6.66699 6.25H13.3337C13.7939 6.25 14.167 6.62310 14.167 7.08333C14.167 7.54357 13.7939 7.91667 13.3337 7.91667H6.66699C6.20676 7.91667 5.83366 7.54357 5.83366 7.08333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Cinta del sombrero */}
      <path
        d="M8.33366 6.66667H11.667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default PanamaHatUser
