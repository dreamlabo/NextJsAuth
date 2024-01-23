import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

const GuildProtectedDashboard =  async () => {

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
    <div>Guild Protected Dashboard Role==='guild member'</div>
  )
}

export default GuildProtectedDashboard