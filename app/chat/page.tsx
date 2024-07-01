'use client'

import { useState, useEffect } from "react"
import ChatContainer from "../components/ChatContainer"
import SendMessage from "../components/SendMessage"
import useClientAuth from "../hooks/useClientAuth"
import { useRouter } from "next/navigation"

export default function PageChat() {
  const router = useRouter()

  const { user, isFetch } = useClientAuth()

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if(!isFetch) {
      setLoading(false)
    }
  }, [isFetch])

  useEffect(() => {
    if(!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  return (
    <div className="w-full h-screen">
      <ChatContainer />
      <SendMessage />
    </div>
  )
}
