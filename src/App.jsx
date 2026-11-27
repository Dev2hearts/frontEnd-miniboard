import Main from "./components/Main";
import AuthForm from "./components/AuthForm";
import SessionProvider from "./contexts/providers";
import TopNav from "./components/TopNav";
import { Routes, Route } from "react-router";

export default function App() {
    return (
        <SessionProvider>
            <>
                <TopNav />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/auth" element={<AuthForm />} />
                </Routes>
            </>
        </SessionProvider>
    );
}
