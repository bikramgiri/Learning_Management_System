"use client"
import StudentDashboard from "@/components/dashboard/StudentDashboard"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"


function StudentLayout({ children }: Readonly < { children: React.ReactNode } > ) {
      const { data: session, status } = useSession()
      useEffect(() => {
            if (status === "loading") return
            //@ts-ignore
            if (!session || session.user.role !== "admin") {
                  redirect("/auth/login")
            }
      }, [session, status])
      if (status === "loading" || status === "unauthenticated") {
            // make: loading at center of the page
            return <div className="flex items-center justify-center h-screen text-2xl text-indigo-600">Loading...</div>
      }
      return(
            <StudentDashboard>
                  {children}
            </StudentDashboard>
      )
}

export default StudentLayout