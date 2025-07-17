import './globals.css'
import { ReactNode } from 'react'
import ReduxProvider from '@/components/ReduxProvider'
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--fonts-poppins",
});
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppinsFont.variable}`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
