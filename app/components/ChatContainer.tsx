import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore'
import {db } from '../db/firebaseConfig'
import useClientAuth from '../hooks/useClientAuth'

interface Message {
    id: string;
    name: string; 
    text: string; 
    avatar:string;
    createdAt: string;
}
export default function ChatContainer() {
  return (
    <div>ChatContainer</div>
  )
}
