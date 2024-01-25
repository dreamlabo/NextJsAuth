import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

const GuildProtectedDashboard =  async () => {

  const session = await getServerSession(options);
  console.log("Session: ", session);

  if(!session){
      redirect("/api/auth/signin?callbackUrl=/guild/dashboard")
  }

  if(!session?.user?.roles?.includes("guildMember")){
      redirect("/denied")
  }

  console.log(session)
  
  return (
    <div className="section-wrapper">
        <main className="section-container">
          <h4>Guild Protected Dashboard</h4>
          <p>Role must equal 'guildMember'</p>
          <p>Logged in role: <span>{session?.user?.roles}</span></p>
      </main>
    </div>

  )
}

export default GuildProtectedDashboard