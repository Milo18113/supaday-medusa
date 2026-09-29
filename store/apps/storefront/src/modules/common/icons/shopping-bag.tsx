import React from "react"

import { IconProps } from "types/icon"

const ShoppingBag: React.FC<IconProps> = ({
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
      <path
        d="M5.83366 7.5V5.83333C5.83366 4.72827 6.27265 3.66845 7.05405 2.88705C7.83545 2.10565 8.89526 1.66667 10.0003 1.66667C11.1054 1.66667 12.1652 2.10565 12.9466 2.88705C13.728 3.66845 14.167 4.72827 14.167 5.83333V7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66699 7.5H15.3337L15.8337 17.5H4.16699L4.66699 7.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ShoppingBag
