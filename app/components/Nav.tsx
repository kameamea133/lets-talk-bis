'use client'

import { FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import useClientAuth from "../hooks/useClientAuth";
import Image from "next/image";


export default function Nav() {

    const { user, loginWithGoogle, redirectIfAuthenticated } = useClientAuth()

  
    const goToDashboard = () => {
        if(!user) {
            loginWithGoogle()
        } else {
            redirectIfAuthenticated()
        }
    }


  return (
    <nav className="h-[90px] w-full flex justify-between items-center bg-[rgba(17,25,40,0.75)] bg-opacity-75 px-4">
    <Link href="/">
      <li className="text-white gap-2 items-center flex rounded-full p-2 hover:text-white hover:bg-gray-400 transition-all cursor-pointer">
        <div className="relative w-[60px] h-[60px]">
          <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" className="rounded-full" />
        </div>
      </li>
    </Link>
    <button onClick={goToDashboard} className="text-white hover:bg-white hover:text-blue-600 p-3 rounded-full transition-all">
      <FaUser />
    </button>
  </nav>
  )
}
