
import { Nunito } from "next/font/google"
import Navbar from "./components/navbar/navbar"
import './globals.css'
import { Inter } from 'next/font/google'

import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"

import getCurretUser from "./actions/getCurrentUser"
import TopUpModal from "./components/modals/TopUpModal"
import WithdrawModal from "./components/modals/WithDrawModal"

const inter = Inter({ subsets: ['latin'] })
const font = Nunito ({ subsets: ['latin']})

export const metadata = {
  title: 'SEA Cinema',
  description: 'SEA Cinema',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {const currentUser = await getCurretUser();
  
  return (
    <html lang="en">
      <body className={font.className}>
       
        <WithdrawModal/>
        <TopUpModal  />
        <ToasterProvider/>
        <RegisterModal />
        <LoginModal/>
        <Navbar currentUser={currentUser}/>
        
        <div className="pb-20 pt-28">
      {children}</div></body>
    </html>
  )
}
