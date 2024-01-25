import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

const User = async () => {

  const session = await getServerSession(options);
  console.log("Session: ", session)

  if(!session){
      redirect("/api/auth/signin?callbackUrl=/user")
  }
  
  if(!session?.user?.roles?.includes("user")){
      redirect("/denied")
  }

  return (
       <div className="section-wrapper">
        <main className="section-container">
          <h4>User Protected Page</h4>
          <p>Role must equal 'user'</p>
          <p>Logged in user: <span>{session?.user?.name}</span></p>
          <p>Logged in role: <span>{session?.user?.roles}</span></p>
      </main>
    </div>
  )
}

export default User