import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

const Admin = async () => {

  const session = await getServerSession(options);
  console.log("Session: ", session)

  if(!session){
      redirect("/api/auth/signin?callbackUrl=/guild/dashboard")
  }

  if(!session?.user?.roles?.includes("admin")){
      redirect("/denied")
  }
  console.log(session)

    return (
      <div className="section-wrapper">
          <main className="section-container">
            <h4>Admin Protected Page</h4>
            <p>Role must equal 'admin'</p>
            <p>Logged in name: <span>{session?.user?.name}</span></p>
            <p>Logged in role: <span>{session?.user?.roles}</span></p>
        </main>
      </div>
  )
}

export default Admin