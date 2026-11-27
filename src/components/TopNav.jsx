import { useState, useContext } from "react";
import { SessionContext } from "../contexts/contexts";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

function LogoutButton() {
    const [error, setError] = useState("");
    const [signingOut, setSigningOut] = useState(false);

    async function logout() {
        if (signingOut) return;
        setSigningOut(true);
        setError("");
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (err) {
            setError(err instanceof Error ? err.message : "요청 처리 중 오류가 발생했습니다.");
        } finally {
            setSigningOut(false);
        }
    }

    return (
        <>
            <button onClick={logout} disabled={signingOut}>
                {signingOut ? "로그아웃 중…" : "로그아웃"}
            </button>
            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
        </>
    );
}

const TopNav = () => {
    const { user, ready } = useContext(SessionContext);
    const isLoggedIn = user !== null;
    const navigate = useNavigate();
    if (!ready) return <header></header>;
    return (
        <header className="topbar">
            <h1>우리 반 게시판</h1>
            {isLoggedIn && (
                <div>
                    <span>{user.email}</span> <LogoutButton key={user.id} />
                </div>
            )}
            {!isLoggedIn && (
                <div>
                    <button onClick={() => navigate("/auth")}>로그인</button>
                </div>
            )}
        </header>
    );
};

export default TopNav;
