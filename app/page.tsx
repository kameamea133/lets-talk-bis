'use client'


import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import  useClientAuth  from "./hooks/useClientAuth";
import { motion } from "framer-motion";


export default function Home() {


   // Animation variants for fade-up effect
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };


  // Custom hook for Google login authentication
  const { loginWithGoogle } = useClientAuth();

  return (
    <section className="w-full h-screen flex items-center justify-center p-3">
     <motion.div
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
     className="max-w-[1000px] m-auto flex items-center justify-center flex-col gap-5 text-center">
      <motion.div 
      variants={FADE_UP_ANIMATION_VARIANTS}
      >
        <div className="relative w-[200px] h-[200px]">

        <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" className="rounded-full" />
        </div>
      </motion.div>
      <motion.p 
      variants={FADE_UP_ANIMATION_VARIANTS}
      className="mt-6 text-center md:text-2xl mb-5 text-white">"Parlez, Partagez, Profitez"</motion.p>
      <motion.button 
      variants={FADE_UP_ANIMATION_VARIANTS}
      onClick={loginWithGoogle} className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md p-2 flex items-center gap-2">
        <FcGoogle /> 
        <span>Se connecter avec Google</span>
      </motion.button>
     </motion.div>
    </section>
  );
}
