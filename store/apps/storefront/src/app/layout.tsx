import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Alegreya, Alegreya_Sans } from "next/font/google"
import "styles/globals.css"

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-alegreya",
  display: "swap",
})

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-alegreya-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-mode="light"
      className={`${alegreya.variable} ${alegreyaSans.variable}`}
    >
      <body className="bg-andes-lana text-andes-tierra font-sans">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
