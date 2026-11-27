import { useState, useEffect } from "react";
import { SessionContext } from "./contexts";
import { supabase } from "../lib/supabase";

export default function SessionProvider({children}){
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const user = session !== null? session.user : null

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession)
        setReady(true)
      },
    )
  return () => subscription.unsubscribe()
  }, [])

  return (
    <SessionContext.Provider value={{user, ready}}>
      {children}
    </SessionContext.Provider>
  )
}
