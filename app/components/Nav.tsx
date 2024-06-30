'use client'

import { FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import useClientAuth from "../hooks/useClientAuth";


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
    <nav className="h-[70px] w-full flex justify-between items-center bg-blue-600 p-3">
        <Link href="/">
        <li className="text-white gap-2 items-center flex rounded-full p-2 hover:text-blue-600 hover:bg-white transition-all">
            <FaHome />
            <span>Home</span>
        </li>
        </Link>
        <button onClick={goToDashboard} className="text-white hover:bg-white hover:text-blue-600 p-3 rounded-full transition-all">
            <FaUser />
        </button>
    </nav>
  )
}
