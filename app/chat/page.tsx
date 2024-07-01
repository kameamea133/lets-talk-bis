'use client'

import { useState, useEffect } from "react"
import ChatContainer from "../components/ChatContainer"
import SendMessage from "../components/SendMessage"
import useClientAuth from "../hooks/useClientAuth"
import { useRouter } from "next/navigation"

export default function PageChat() {

  'use client'

import { useState, useEffect } from "react"
import ChatContainer from "../components/ChatContainer"
import SendMessage from "../components/SendMessage"
import useClientAuth from "../hooks/useClientAuth"
import { useRouter } from "next/navigation"

export default function PageChat() {

  // Router instance for navigation
  const router = useRouter()


  // Destructure user and isFetch from useClientAuth hook
  const { user, isFetch } = useClientAuth()

  const [loading, setLoading] = useState(true)


  // Effect to handle loading state based on isFetch
  useEffect(() => {
    if(!isFetch) {
      setLoading(false)
    }
  }, [isFetch])


  // Effect to redirect to home page if not loading and user is not authenticated
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
