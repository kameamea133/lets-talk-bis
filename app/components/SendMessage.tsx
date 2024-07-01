'use client'



import React, { useState, ChangeEvent, FormEvent } from 'react'
import useClientAuth from '../hooks/useClientAuth'
import {db} from '../db/firebaseConfig'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { IoSend } from 'react-icons/io5'

export default function SendMessage() {
    const [value, setValue] = useState('')
    const {user} = useClientAuth()


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val)
    }

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();

        try{
            if(user) {
                const {uid, displayName, photoURL} = user;
                await addDoc(collection(db, 'messages'), {
                    text: value,
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    createdAt: serverTimestamp()
                })
            }

        }catch(err){
            console.log(err)
    }
    setValue('')
}


  return (
    <form onSubmit={handleSubmit} className='bg-blue-200 fixed bottom-0 w-full py-10 flex items-center justify-center px-3 flex-col'>


    <div className='w-full flex items-center justify-center px-3'>
        <input value={value} onChange={handleChange} placeholder='Votre message...' type="text" className='p-3 w-full outline-none border-none rounded-l-md'/>
        <button type="submit" className="bg-green-500 text-white p-3 flex items-center gap-2 border-none rounded-r-md">
            <IoSend />
            <span>Envoyer</span>
        </button>
    </div>
    </form>
  )
}
