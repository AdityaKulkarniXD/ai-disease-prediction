"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Activity, User } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<{ name: string | null }>({ name: null })

  useEffect(() => {
    async function getProfile() {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single()

        if (!error && data) {
          setProfile(data)
        }
      }
    }

    getProfile()
  }, [user])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <Activity className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold">AI Disease Prediction</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/predict"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/predict" ? "text-primary font-bold" : "text-foreground/60"
              )}
            >
              Predict
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === "/dashboard" ? "text-primary font-bold" : "text-foreground/60"
                )}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            {user ? (
              <>
                <span className="text-sm font-medium mr-2">
                  {profile.name || user.email}
                </span>
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <User className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button variant="default">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}