'use client'
import { useState } from "react";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";



// import { getServerSession } from "next-auth";
// import options from "@/app/api/auth/[...nextauth]/options";

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  

  // const session = await getServerSession(options);
  const {data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/guild/members")
    }
  
  })

  const handleClick = () => {
    console.log('clicked')
    setShowDropdown(!showDropdown);
  }

  return (
    <header className="header">
        <nav className="navigation">
          <div>
             <Link href="/">Home</Link>
          </div>
          <div className="nav-links">
             {/* <Link href="/guild/members">Guild Member</Link>
             <Link href="/guild/dashboard">Guild Dashboard</Link>
             <Link href="/user">User</Link>
             <Link href="/admin">Admin</Link> */}
             {/* <Link href="/admin">Admin</Link> */}
             {session ? (<div>{session.user.email}</div>) : null}
             {session ? 
              (<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
             ) 
             : (
              <Link href="/api/auth/signin">Login</Link>
             )}
             {/* <FaRegUserCircle size={32} /> */}
             <button onClick={handleClick}><FaRegUserCircle size={32} /></button>
              {showDropdown ? (<div className="nav-dropdown">
                <h2>Account</h2>
                <div className="grid">
                  <FaRegUserCircle size={32} /> 
                  <div>
                    <p>{session?.user?.name}</p>
                    <p>{session?.user?.email}</p>
                  </div>
                 
                </div>
                <button>Logout</button>
                
              </div>) : null}
          </div>
        </nav>
    </header>
  )
}

export default Nav