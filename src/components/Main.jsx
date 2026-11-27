import { useContext, useState } from "react";
import { supabase } from "../lib/supabase";
import AuthForm from "./AuthForm";
import Board from "./Board";
import { SessionContext } from "../contexts/contexts";

export default function Main() {
    const { user, ready } = useContext(SessionContext);
    const isLoggedIn = user !== null;

    if (!ready)
        return (
            <main>
                <p role="status">로그인 상태 확인 중…</p>
            </main>
        );

    return <main>{isLoggedIn ? <Board key={user.id} /> : <p>로그인 하세요 !</p>}</main>;
}
