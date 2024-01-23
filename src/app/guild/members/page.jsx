'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const GuildMembersClient = () => {

  const {data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/guild/members")
    }
  
  })
    return (
      <div>Guild Members Client Page role === none needed</div>
    )
  }
  
  export default GuildMembersClient