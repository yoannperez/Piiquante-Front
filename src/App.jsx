import Navigation from "./components/Navigation";
import "./styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Sauces from "./Pages/Sauces";
import { useEffect, useContext } from "react";
import { UserContext } from "./utils/context/context";

function App() {
    const { user, setUser, refresh } = useContext(UserContext);

    useEffect(() => {
        setUser(localStorage.getItem("PiiquanteUser"));
        // eslint-disable-next-line
    }, [user, refresh]);

    return (
        <>
            <Navigation />
            {user ? (
                <Routes>
                    <Route path="/" element={<Sauces />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            )}
        </>
    );
}

export default App;
