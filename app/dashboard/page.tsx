'use client'

import { FaSignOutAlt } from "react-icons/fa";
import {signOut} from 'firebase/auth';
import { useEffect } from "react";
import  useClientAuth  from "../hooks/useClientAuth";
import { useRouter } from "next/navigation";
import { auth } from "../db/firebaseConfig";
import { motion } from "framer-motion";

export default function PageDashboard() {

  // Router instance for navigation
  const router = useRouter();

   // Destructure user and redirectIfAuthenticated from useClientAuth hook
  const { user, redirectIfAuthenticated } = useClientAuth();


  // Effect to redirect if user is not authenticated
useEffect(() => {
  if(!user) {
    redirectIfAuthenticated();
  }
}, [user])


 // Function to handle sign out
  const handleSignOut = () => {
    signOut(auth);
    router.push('/');
  }


   // Animation variants for fade-down effect
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <>
    {user && <motion.div 
     initial="hidden"
     animate="show"
     viewport={{ once: true }}
     variants={{
       hidden: {},
       show: {
         transition: {
           staggerChildren: 0.15,
         },
       },
     }}
    className="w-full h-screen relative">
      <div className="w-full h-screen flex items-center flex-col gap-5 p-3 pt-20">
      <motion.h1 
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      className="text-6xl uppercase text-white">MY DASH<span className="text-blue-600">BOARD</span></motion.h1>
      <ul className="flex flex-col justify-center gap-3 items-center">
        <motion.li 
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        ><img src={`${user?.photoURL}`} alt="photo profil" className="w-16 h-16 rounded-full shadow-2xl"/></motion.li>
        <motion.li
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="text-white">Bienvenue <b>{user?.displayName}</b></motion.li>
      </ul>
      <button onClick={handleSignOut} className="absolute top-[400Px] lg:top-[350px] block shadow-lg bg-[rgba(17,25,40,0.75)] bg-opacity-75 px-3 py-1 text-white hover:bg-red-800 my-3 rounded-md">
        <FaSignOutAlt  />
      </button>
      <motion.button 
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      onClick={() => router.push('/chat')} className=" block bg-[rgba(17,25,40,0.75)] bg-opacity-75 px-3 py-1 shadow-lg text-white hover:bg-[rgba(17,25,40,0.35)] my-3 rounded-md">
       Accéder au chat
      </motion.button>
      </div>
      </motion.div>}
    </>
  )
}
