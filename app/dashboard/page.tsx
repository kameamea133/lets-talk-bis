'use client'


import { FaSignOutAlt } from "react-icons/fa";
import {signOut} from 'firebase/auth';
import { useEffect } from "react";
import  useClientAuth  from "../hooks/useClientAuth";
import { useRouter } from "next/navigation";
import { auth } from "../db/firebaseConfig";

export default function PageDashboard() {

  const router = useRouter();
  const { user, redirectIfAuthenticated } = useClientAuth();

useEffect(() => {
  if(!user) {
    redirectIfAuthenticated();
  }
}, [user])

  const handleSignOut = () => {
    signOut(auth);
    router.push('/');
  }
console.log(user)
  return (
    <>
    {user && <div className="w-full h-screen relative">
      <div className="w-full h-screen flex items-center flex-col gap-5 p-3 pt-20">
      <span className="font-bold text-blue-600">Votre compte</span>
      <h1 className="text-6xl uppercase font-black">DASH<span className="text-blue-600">BOARD</span></h1>
      <ul className="flex flex-col justify-center gap-3 items-center">
        <li><img src={`${user?.photoURL}`} alt="photo profil" className="w-16 h-16"/></li>
        <li>Bienvenue <b>{user?.displayName}</b></li>
      </ul>
      <button onClick={handleSignOut} className="absolute top-2 right-2 block bg-red-500 px-3 py-1 text-white hover:bg-red-800 my-3 rounded-md">
        <FaSignOutAlt  />
      </button>
      <button onClick={() => router.push('/chat')} className=" block bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-800 my-3 rounded-md">
       Accéder au chat
      </button>
      </div>
      </div>}
    </>
  )
}
