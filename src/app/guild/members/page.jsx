'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const GuildMembersClient = () => {
    return (
      <div className="section-wrapper">
        <main className="section-container">
          <h4>Guild Member List</h4>
          <p>Role == None Needed</p>
        </main>
      </div>
    )
  }
  
  export default GuildMembersClient